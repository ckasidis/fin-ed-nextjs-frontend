import dynamic from 'next/dynamic';

const StockPage = dynamic(() => import('../../dynamic/StockGraph'), {
	ssr: false,
});
export default StockPage;
