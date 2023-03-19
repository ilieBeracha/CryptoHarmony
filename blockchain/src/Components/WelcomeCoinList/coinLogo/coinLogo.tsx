import "./coinLogo.css";

function CoinLogo({logo}:{logo:any}): JSX.Element {
    return (
        <div className="coinLogo">
			<img src={logo} alt='coin' />
        </div>
    );
}

export default CoinLogo;
