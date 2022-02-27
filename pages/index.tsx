import { NextPage } from 'next';
import { BsPiggyBankFill } from 'react-icons/bs';
import { FaFileContract, FaMoneyCheck } from 'react-icons/fa';
import { GrBitcoin } from 'react-icons/gr';
import { MdAutoGraph } from 'react-icons/md';
import { RiStockFill } from 'react-icons/ri';
import GridCard from '../components/common/GridCard';

const LearnPage: NextPage = () => {
	return (
		<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl p-5 mx-auto">
			<GridCard
				icon={BsPiggyBankFill}
				title="Deposit"
				path="/deposit"
				bgColor="bg-rose-700"
			>
				<h1 className="text-2xl font-bold">Deposit</h1>
				<h2 className="text-lg font-bold">Money held at bank</h2>
				<h3>Definition from Investopedia:</h3>
				<p>
					{`"A deposit is a financial term that means money held at a bank. A
					deposit is a transaction involving a transfer of money to another
					party for safekeeping. However, a deposit can refer to a portion of
					money used as security or collateral for the delivery of a good."`}
				</p>
			</GridCard>
			<GridCard
				icon={RiStockFill}
				title="Stock"
				path="/stock"
				bgColor="bg-violet-600"
			>
				<h1 className="text-2xl font-bold">Stock</h1>
				<h2 className="text-lg font-bold">
					Fractional ownership of corporation
				</h2>
				<h3>Definition from Investopedia:</h3>
				<p>
					{`"A stock (also known as equity) is a security that represents the
					ownership of a fraction of a corporation. This entitles the owner of
					the stock to a proportion of the corporation's assets and profits
					equal to how much stock they own. Units of stock are called
					"shares." Stocks are bought and sold predominantly on stock
					exchanges (though there can be private sales as well) and are the
					foundation of many individual investors' portfolios. These
					transactions have to conform to government regulations that are
					meant to protect investors from fraudulent practices. Historically,
					they have outperformed most other investments over the long run.
					These investments can be purchased from most online stockbrokers."`}
				</p>
			</GridCard>
			<GridCard
				icon={FaMoneyCheck}
				title="Bond"
				path="/bond"
				bgColor="bg-amber-500"
			>
				<h1 className="text-2xl font-bold">Bond</h1>
				<h2 className="text-lg font-bold">Loan made to borrower</h2>
				<h3>Definition from Investopedia:</h3>
				<p>
					{`"A bond is a fixed-income instrument that represents a loan made
					by an investor to a borrower (typically corporate or governmental). A
					bond could be thought of as an I.O.U. between the lender and borrower
					that includes the details of the loan and its payments. Bonds are used
					by companies, municipalities, states, and sovereign governments to
					finance projects and operations. Owners of bonds are debtholders, or
					creditors, of the issuer. Bond details include the end date when the
					principal of the loan is due to be paid to the bond owner and usually
					include the terms for variable or fixed interest payments made by the
					borrower."`}
				</p>
			</GridCard>

			<GridCard
				icon={FaFileContract}
				title="Forward Contract"
				path="/forward-contract"
				bgColor="bg-orange-600"
			>
				<h1 className="text-2xl font-bold">Forward Contract</h1>
				<h2 className="text-lg font-bold">Buy/Sell asset on future date</h2>
				<h3>Definition from Investopedia:</h3>
				<p>
					{`"A forward contract is a customized contract between two parties to buy 
					or sell an asset at a specified price on a future date. A forward contract 
					can be used for hedging or speculation, although its non-standardized 
					nature makes it particularly apt for hedging."`}
				</p>
			</GridCard>
			<GridCard
				icon={MdAutoGraph}
				title="Option"
				path="/option"
				bgColor="bg-sky-600"
			>
				<h1 className="text-2xl font-bold">Option</h1>
				<h2 className="text-lg font-bold">
					Right but not obligation to buy/sell asset
				</h2>
				<h3>Definition from Investopedia:</h3>
				<p>
					{`"Call options are financial contracts that give the option buyer the
					right but not the obligation to buy a stock, bond, commodity, or other
					asset or instrument at a specified price within a specific time
					period. The stock, bond, or commodity is called the underlying asset.
					A call buyer profits when the underlying asset increases in price. A
					call option may be contrasted with a put option, which gives the
					holder the right to sell the underlying asset at a specified price on
					or before expiration."`}

					<br />

					{`"A put option (or “put”) is a contract giving the
					option buyer the right, but not the obligation, to sell—or sell
					short—a specified amount of an underlying security at a predetermined
					price within a specified time frame. This predetermined price at which
					the buyer of the put option can sell the underlying security is called
					the strike price. Put options are traded on various underlying assets,
					including stocks, currencies, bonds, commodities, futures, and
					indexes. A put option can be contrasted with a call option, which
					gives the holder the right to buy the underlying security at a
					specified price, either on or before the expiration date of the option
					contract."`}
				</p>
			</GridCard>
			<GridCard
				icon={GrBitcoin}
				title="Digital Asset"
				path="/digital-asset"
				bgColor="bg-lime-600"
			>
				<h1 className="text-2xl font-bold">{`Digital Asset (Crypto)`}</h1>
				<h2 className="text-lg font-bold">
					Digital currency secured by cryptography:
				</h2>
				<h3>Definition from Investopedia</h3>
				<p>
					{`"A cryptocurrency is a digital or virtual currency that is secured
					by cryptography, which makes it nearly impossible to counterfeit or
					double-spend. Many cryptocurrencies are decentralized networks based
					on blockchain technology—a distributed ledger enforced by a
					disparate network of computers. A defining feature of
					cryptocurrencies is that they are generally not issued by any
					central authority, rendering them theoretically immune to government
					interference or manipulation."`}
				</p>
			</GridCard>
		</div>
	);
};

export default LearnPage;
