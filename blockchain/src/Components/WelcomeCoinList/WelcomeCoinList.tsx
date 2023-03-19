import "./WelcomeCoinList.css";
import btcLogo from '../../assets/logos/bitcoin.png'
import solLogo from '../../assets/logos/solana.png'
import ethLogo from '../../assets/logos/ethereum.png'
import maticLogo from '../../assets/logos/polygon.png'
import fileLogo from '../../assets/logos/filecoin.png'
import xrpLogo from '../../assets/logos/xrp.png'
import CoinLogo from "./coinLogo/coinLogo";

const coins = [btcLogo, solLogo, ethLogo, maticLogo, fileLogo, xrpLogo]

function WelcomeCoinList(): JSX.Element {
    return (
        <div className="WelcomeCoinList">
            <div className="WelcomeCoinListText">
                <p>
                    Stay updated on your favorite cryptocurrencies
                </p>
            </div>
            <div className="WelcomeCoinListCoins">
                {
                    coins.map((coin: any) => <CoinLogo logo={coin} />)
                }
            </div>
        </div>
    );
}

export default WelcomeCoinList;
