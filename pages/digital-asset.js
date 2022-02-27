import dynamic from 'next/dynamic';

const DigitalAssetPage = dynamic(() => import('../dynamic/CryptoGraph'), {
	ssr: false,
});

export default DigitalAssetPage;
