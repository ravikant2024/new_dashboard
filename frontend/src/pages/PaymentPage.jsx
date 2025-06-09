import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import FormSubmitter from "../features/checkout/FormSubmitter";
import { initialpaymentAsync } from "../features/orders/OrderSlice";
import Loader from "react-js-loader";

const PaymentPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const payload = location.state ? location.state.payload : null;

    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const handlePayment = async () => {
            try {
                if (payload) {
                    const response = await dispatch(initialpaymentAsync(payload)).unwrap();
                    if (response?.gatewayURL && response?.EncData && response?.data) {
                        setInitialData(response);
                    } else {
                        setError("Invalid payment response.");
                    }
                } else {
                    setError("No payload found");
                }
            } catch (err) {
                setError("Something went wrong while processing payment.");
            }
        };

        handlePayment();
    }, [payload, dispatch]);

    // 👉 loader stops only when either data or error is set
    useEffect(() => {
        if (initialData || error) {
            setLoading(false);
        }
    }, [initialData, error]);

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            {loading ? (
                <Loader type="spinner-circle" bgColor={"red"} size={100} />
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <FormSubmitter
                    gatewayURL={initialData.gatewayURL}
                    EncData={initialData.EncData}
                    data={initialData.data}
                />
            )}
        </div>
    );
};

export default PaymentPage;
