import Decimal from "decimal.js";

enum BlockchainEnum {
  OSMOSIS = "Osmosis",
  ETHEREUM = "Ethereum",
  ARBITRUM = "Arbitrum",
  ZILLIQA = "Zilliqa",
  NEO = "Neo",
}

const MISSING_PRIORITY = -99;


interface WalletBalance {
  blockchain: BlockchainEnum;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

const BLOCKCHAIN_PRIORITY: Record<BlockchainEnum, number> = {
  [BlockchainEnum.OSMOSIS]: 100,
  [BlockchainEnum.ETHEREUM]: 50,
  [BlockchainEnum.ARBITRUM]: 30,
  [BlockchainEnum.ZILLIQA]: 20,
  [BlockchainEnum.NEO]: 20,
};

const getPriority = (chain: BlockchainEnum): number => BLOCKCHAIN_PRIORITY[chain] ?? MISSING_PRIORITY;

const WalletRowMemo = React.memo(WalletRow); //memoized to prevent rerender

export const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  //handle loading state
  if (!balances || !prices) {
    return <div {...rest}>Loading assets...</div>;
  }

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => getPriority(balance.blockchain) > MISSING_PRIORITY && balance.amount > 0 )
      .map((balance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      }))
      .sort((a, b) => b.priority - a.priority) //descending
      .map(({ priority, ...balance }) => balance);
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    //defensive check for prices object
    if (!prices) return [];

    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }) + ` ${balance.currency}`,
      usdValue: Number(
        new Decimal(balance.amount)
          .mul(prices[balance.currency] ?? 0) 
          .toFixed(8)
      ),
    }));
  }, [sortedBalances, prices]);

  const rows = useMemo(() => {
    return formattedBalances.map((balance: FormattedWalletBalance) => (
      <WalletRowMemo
        className={classes.row}
        key={`${balance.blockchain}-${balance.currency}`} //better key for uniqueness
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    ));
  }, [formattedBalances, classes.row]);

  //handle empty state
  if (rows.length === 0) {
    return <div {...rest}>No balances found.</div>;
  }

  return <div {...rest}>{rows}</div>;
};
