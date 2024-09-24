import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./pricingplans.css";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const stripePromise = loadStripe(
  "pk_test_51Pbx75BhP7Tw96geTXJFK7F1yikh4yVxR2QEWCHM55pR7tqxQ8j3aVxvuGBuQKzgYCoQgIJ0pDZZM0VXHiVtq1Yl00KUWxRXHN"
);

const PricingPlans = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="app__pricingplans">
      <SectionTitle>
        <h1>Pricing Plans</h1>
      </SectionTitle>
      <div className="app__pricingplans-table box-shadow">
        <stripe-pricing-table
          pricing-table-id="prctbl_1PbzFLBhP7Tw96geBBZHsWi1"
          publishable-key="pk_test_51Pbx75BhP7Tw96geTXJFK7F1yikh4yVxR2QEWCHM55pR7tqxQ8j3aVxvuGBuQKzgYCoQgIJ0pDZZM0VXHiVtq1Yl00KUWxRXHN"
        ></stripe-pricing-table>
      </div>
    </div>
  );
};

const PricingPlansWithStripe = () => (
  <Elements stripe={stripePromise}>
    <PricingPlans />
  </Elements>
);

export default PricingPlansWithStripe;
