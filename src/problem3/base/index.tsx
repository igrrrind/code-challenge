interface WalletBalance {
  currency: string;
  amount: number; //crytpto context -> risk of overflow if type is number
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
} //this interface could inherit wallet ballance instead of being a complete new type

interface Props extends BoxProps {
} // extends but doesn't define any field

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();


  //magic values (-99, 100, 50, 30, 20) is very fragile.
	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis': //should be enum
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20 //duplicate return value
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain); //this is not used
		  if (lhsPriority > -99) { //lhsPriority not defined but let's assume it is
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) { //descending sort but is verbose
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
      // implicit return undefined when priorities are equal
    });
  }, [balances, prices]); // prices in dependency array is never used 

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => { //not used in rows map, recalculates every rerender
    return {
      ...balance,
      formatted: balance.amount.toFixed() //No currency symbol, no locale formatting, no grouping, crypto decimals vary widely
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;  //recalculates on every rerender
    return (
      <WalletRow  //nested return, redenders this WalletRow map on rerender
        key={index} //index not reliable and unique
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}