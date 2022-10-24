import './App.css';
import './component/css/style.css'
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home';
//import './component/sass/main.css'
import SignupOption from './component/SignupOption';
import LoginOption from './component/LoginOption';
import Signup from './component/Signup';
import Login from './component/Login';
import SignupasCustomer from './component/SignupasCustomer';
import LoginasCustomer from './component/LoginasCustomer';
import ChooseService from './component/ChooseService';
import Recentorder from './component/Recentorder';
import Profile from './component/Profile';
import Orderdetail from './component/Orderdetail';
import FuelDelivery from './component/FuelDelivery';
import Mechanic from './component/Mechanic';
import NoService from './component/NoService';
import Forget from './component/Forget';
import Password from './component/Password';
import Cforget from './component/Cforget';
import Cpassword from './component/Cpassword';
function App() {
  return (
    <div className="App">
      <Routes>
       
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signupOption" element={<SignupOption />} />
        <Route exact path="/loginOption" element={<LoginOption />} />
        <Route exact path="/customersignup" element={<SignupasCustomer />} />
        <Route exact path="/spsignup" element={<Signup />} />
        <Route exact path="/customerlogin" element={<LoginasCustomer />} />
        <Route exact path="/splogin" element={<Login />} />
        <Route exact path='/chooseservices' element={<ChooseService />} />
        
        <Route exact path='/recentorders' element={<Recentorder />} />
       
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/orderdetail/:id/:lat/:lng/:lat1/:lng1' element={<Orderdetail />} />
      
        <Route exact path="/mechanic/:lat/:lng" element={<Mechanic />} />
        <Route exact path="/noservice" element={<NoService />} />
        <Route exact path="/fueldelivery/:lat/:lng" element={<FuelDelivery />} />
        <Route exact path="/sforget" element={<Forget />} />
        <Route exact path="/spassword/:email" element={<Password />} />
        <Route exact path="/forget" element={<Cforget />} />
        <Route exact path="/password/:email" element={<Cpassword />} />
      </Routes>
    </div>
  );
}

export default App;
