import Decimal from "decimal.js";

interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

const BLOCKCHAIN_PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (chain: string) => BLOCKCHAIN_PRIORITY[chain] ?? -99;

interface Props extends BoxProps {}

const WalletRowMemo = React.memo(WalletRow);

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .map((balance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      }))
      .sort((a, b) => b.priority - a.priority) //descending
      .map(({ priority, ...balance }) => balance);
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => { //prevents rerenders
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
      <WalletRow
        className={classes.row}
        key={`${balance.blockchain}-${balance.currency}`} //better key for uniqueness
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    ));
  }, [formattedBalances, classes.row]);

  return <div {...rest}>{rows}</div>;
};
