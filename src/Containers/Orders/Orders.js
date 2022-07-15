import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Components/Layout/Layout';
import { getInitialData } from '../../actions/initialData.action';
import NewModal from "../../Components/UI/Modal/NewModal";
// import { generatePublicUrl } from '../../urlConfig';
import { updateOrder } from "../../actions/Order.actions"
import { FaSyncAlt } from 'react-icons/fa';
import "./style.css";

const Orders = () => {
    const [orderStatus, setOrderStatus] = useState("")
    const [tempStatus, setTempStatus] = useState("")
    const [currentOrder, setCurrentOrder] = useState({})
    const [showUpdateOrderModal, setShowUpdateOrderModal] = useState(false);

    const [idToOperate, setIdToToOperate] = useState("");

    const order = useSelector(state => state.order)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])


    //to show the orders
    const renderOrders = () => {
        return (
            <Table style={{ fontSize: "16px", width: "100%" }} responsive="sm">
                <thead style={{ textAlign: "center" }}>
                    <tr>
                        {/* <th>S. No.</th> */}
                        <th>Order Date</th>
                        <th>Order Time</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Payment Mode</th>
                        <th>Current Status</th>
                        <th style={{ textAlign: "center" }}>View Items</th>

                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {
                        order.orders.length > 0 ?
                            order.orders.map((order, index) => <tr key={order._id}>
                                {/* <td>{index + 1}</td> */}
                                <td>{`${new Date((order.createdAt).toString()).toLocaleDateString().split("/")[1]}/${new Date((order.createdAt).toString()).toLocaleDateString().split("/")[0]}/${new Date((order.createdAt).toString()).toLocaleDateString().split("/")[2]}`}</td>
                                <td>{new Date((order.createdAt).toString()).toLocaleTimeString()}</td>
                                <td>{order.phone}</td>
                                <td>{order.address}</td>
                                <td>{order.paymentType}</td>
                                <td>{order.status}</td>

                                <td style={{
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}>
                                    <Button variant="outline-success" onClick={(e) => {
                                        e.preventDefault();
                                        setIdToToOperate(order._id)
                                        handleShowUpdateOrderModal(order);
                                    }}>View Order and Update Status</Button>
                                </td>
                            </tr>
                            )
                            :
                            null
                    }


                </tbody>
            </Table>
        )
    }

    const handleShowUpdateOrderModal = (ord) => {
        setCurrentOrder(ord);
        setOrderStatus(ord.status)
        setTempStatus(ord.status)
        setShowUpdateOrderModal(true);
    }
    const handleClose = () => {
        setShowUpdateOrderModal(false);
    }

    const renderCart = () => {

        let totalCart = []

        Object.entries(currentOrder.items.items).forEach(item => {
            Object.entries(item[1]).forEach(itemValue => {
                if (itemValue[0] === "item") {
                    totalCart.push({
                        item: {
                            ...itemValue[1]
                        },
                        quantity: item[1].qty
                    })
                }
            })
        })

        return (<section className="cart py-16">

            <div className=" order container mx-auto w-1/2">
                <div className="flex items-center border-b border-gray-300 pb-4">
                    <h2 className=" font-bold ml-4 text-2xl">Order Summary</h2>
                </div>

                <div className="d-flex items-center border-b border-gray-300 pb-4">
                    <h5 className="ml-4 text-2xl">Customer Name : <span className="text-success"> {currentOrder.user.name}</span></h5>

                </div>

                <Table style={{ fontSize: "16px", width: "100%" }} responsive="sm">
                    <thead style={{ textAlign: "center" }}>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                        {
                            totalCart.map((val) => <tr key={order._id}>
                                <td><h4>{val.item.name}</h4></td>
                                <td><h5>{val.quantity}</h5></td>
                            </tr>
                            )
                        }

                    </tbody>
                </Table>

                <div className="d-flex text-right justify-content-between align-items-center py-4">
                    <div className="d-flex align-items-center justify-content-center" >
                        <h3 className="font-bold">Total Amount:</h3>
                        <h5 className="amount text-2xl font-bold ml-2">₹{currentOrder.items.totalPrice}</h5>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <h5>Update Status</h5>
                        <select
                            disabled={orderStatus === "Delivered" || orderStatus === "Order Cancelled" ? true : false}
                            className="form-control form-select"
                            value={tempStatus}
                            onChange={(e) => {
                                setTempStatus(e.target.value)
                            }}
                        >
                            <option key="Order Placed" value="Order Placed">Order Placed</option>
                            <option key="Order Confirmed" value="Order Confirmed">Order Confirmed</option>
                            <option key="Being Cooked" value="Being Cooked">Being Cooked</option>
                            <option key="Out For Delivery" value="Out For Delivery">Out for Delivery</option>
                            <option key="Delivered" value="Delivered">Delivered</option>
                            <option key="Order Cancelled" value="Order Cancelled">Order Cancelled</option>

                        </select>
                    </div>
                </div>
            </div>

        </section>)


    }

    const renderUpdateOrderModal = () => {
        if (!currentOrder) {
            return null
        }

        return <>
            <NewModal
                // size="lg"
                dontShowSubmitButton={currentOrder.status === "Delivered" ? true : false}
                show={showUpdateOrderModal}
                handleClose={handleClose}
                modelTitle={"View and Update Order"}
                operation={update}
            >
                {renderCart()}

            </NewModal>
        </>
    }

    const update = () => {

        dispatch(updateOrder(idToOperate, tempStatus));
        dispatch(getInitialData());
        setShowUpdateOrderModal(false);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "25px" }}>
                            <h3>Orders</h3>
                            <button className="syncBtn" onClick={() => { dispatch(getInitialData()) }} ><FaSyncAlt /></button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderOrders()}
                    </Col>
                </Row>
            </Container>
            {showUpdateOrderModal ? renderUpdateOrderModal() : null}
        </Layout>
    )
}
export default Orders
