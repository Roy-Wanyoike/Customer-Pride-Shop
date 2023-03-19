const MpesaApi = require("../lib/mpesa");

const getOAuthToken = async (req, res) => {
    const mpesaApi = new MpesaApi();

    try {
        const token = await mpesaApi.getOAuthToken();
        res.json({ token });
    } catch (error) {
        console.log({ error });
        res.status(400).send(error);
    }
};

const lipaNaMpesaOnline = async (req, res) => {
    const mpesaApi = new MpesaApi();

    // if (!req.body.amount) {
    //     return res.status(400).send({ message: "Amount is required" });
    // }
    // if (!req.body.sender) {
    //     return res.status(400).send({ message: "Sender contact is required" });
    // }

    try {
        const token = await mpesaApi.getOAuthToken();

        const options = {
            sender: "254795429305",
            amount: 1,
            reference: "Order Payment - Pride",
            description: "Payment for order",
            shortCode: "174379",
            callbackUrl: "https://pride.onrender.com/payment/mpesa/hook",
        };

        const data = await mpesaApi.lipaNaMpesaOnline(token, options);

        res.send({ data: data?.data ? data?.data : data });
    } catch (error) {
        res.status(400).send(error);
    }
};

const lipaNaMpesaHook = async (req, res) => {
    console.log("-----------Received M-Pesa webhook-----------");

    console.log(req.body);

    let message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    // respond to safaricom servers with a success message
    res.json(message);
};

module.exports = {
    getOAuthToken,
    lipaNaMpesaOnline,
    lipaNaMpesaHook,
};
