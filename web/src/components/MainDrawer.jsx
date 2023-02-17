import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../constants";
import Front from "./Front";
import Login from "../pages/Login";
import Cart from '../pages/Cart'
import Slides from "../pages/Slides";
import ItemDescription from "../pages/ItemDescription";
import Logout from "../pages/Logout";
import VendorSignUpOne from "../pages/register/VendorSignUpOne";
import FirstPage from "../pages/register/FirstPage";
import AddressInput from "../pages/register/AddressInput";
import Grid from "./Grid";
import SignupComplete from "../pages/register/SignupComplete";
import SearchResults from "./SearchResults";
import Payment from "../pages/checkout/Payment";

const Drawer = createDrawerNavigator();

export default MainDrawer = () => {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  return (
    <Drawer.Navigator 
      initialRouteName={ROUTES.SLIDES}
      screenOptions={{
              headerShown: false,
              drawerStyle: {
                backgroundColor: "#222020",
                width: "80%"
              },
              drawerActiveBackgroundColor: "#222020",
              drawerLabelStyle: {
                fontSize: 36,
                margin: 12,
                color: "white"
              },
              drawerActiveTintColor: "#57D491",
            }}
      options={{ drawerItemStyle: { height: 0, }}}
      >

        <Drawer.Screen
          name={ROUTES.SLIDES}
          options={{
            drawerLabel: "Home",
            headerShown: false,
             //drawerItemStyle: { display: "none" }
            }}
          component={Slides}
        />
        
        <Drawer.Screen
          name={ROUTES.ITEM_DESCRIPTION}
          options={{
            drawerLabel: "Item Description",
            headerShown: false,
            drawerItemStyle: { display: "none" }
            }}
          component={ItemDescription}
        />
        <Drawer.Screen
          name={ROUTES.CART}
          options={{
            drawerLabel: "Cart",
            headerShown: false,
             //drawerItemStyle: { display: "none" }
            }}
          component={Cart}
        />
        
        <Drawer.Screen
          name={"VendorSignUpOne"}
          options={{
            drawerLabel: "Sell with us",
            headerShown: false,
            }}
          component={VendorSignUpOne}
        />
        <Drawer.Screen
          name={"Register"}
          options={{
            drawerLabel: "Register",
            headerShown: false,
            }}
          component={FirstPage}
        />
        <Drawer.Screen
          name={"AddressInput"}
          options={{
            drawerLabel: "AddressInput",
            headerShown: false,
            drawerItemStyle: { display: "none" }
            }}
          component={AddressInput}
        />
        <Drawer.Screen
          name={ROUTES.LOGIN}
          options={{
            drawerLabel: "Login",
            headerShown: false,
             drawerItemStyle: { display: "none" }
            }}
          component={Login}
        />
        
        <Drawer.Screen
          name={ROUTES.LOGOUT}
          options={{
            drawerLabel: "Logout",
            headerShown: false,
            drawerItemStyle: { display: user && user.email ? "flex" : "none" }
            }}
          component={Logout}
        />
        <Drawer.Screen
          name={'Grid'}
          options={{
            drawerLabel: "Grid",
            headerShown: false,
            drawerItemStyle: { display: "none" }
            }}
          component={Grid}
        />
        <Drawer.Screen
          name={'SignupComplete'}
          options={{
            drawerLabel: "SignupComplete",
            headerShown: false,
            drawerItemStyle: { display: "none" }
            }}
          component={SignupComplete}
        />
        <Drawer.Screen
          name={"SearchResults"}
          options={{
            drawerLabel: "SearchResults",
            headerShown: false,
            drawerItemStyle: { display: "none" }
            }}
          component={SearchResults}
        />
        <Drawer.Screen
          name={"Payment"}
          options={{
            drawerLabel: "Payment",
            headerShown: false,
            drawerItemStyle: { display: "none" }
            }}
          component={Payment}
        />
    </Drawer.Navigator>
  );
};
