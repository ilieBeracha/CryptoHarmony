import WelcomeCoinList from "../../Components/WelcomeCoinList/WelcomeCoinList";
import WelcomeComponent from "../../Components/WelcomeComponent/WelcomeComponent";
import "./LandingPage.css";

function LandingPage(): JSX.Element {
    return (
        <div className="LandingPage">
			<div className="WelcomeComponentDiv">
                <WelcomeComponent />
            </div>
			<div className="WelcomeCoinListDiv">
                <WelcomeCoinList />
            </div>
        </div>
    );
}

export default LandingPage;
