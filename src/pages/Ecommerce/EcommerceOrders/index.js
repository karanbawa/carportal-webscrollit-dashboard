import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmpty } from "lodash";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import DeleteModal from '../../../components/Common/DeleteModal';

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
  getProductList as getProductListdata,
  deleteAllOrders as ondeleteAllOrders,
  getCustomers,
  addNewCustomer
} from "../../../store/e-commerce/actions";

import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod
}
  from "./EcommerceOrderCol";

//redux
import { useSelector, useDispatch } from "react-redux";
import EcommerceOrdersModal from "./EcommerceOrdersModal";

import {
  Button,
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
} from "reactstrap";

function EcommerceOrder() {

  //meta title
  document.title = "Orders | Scrollit";

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState(null);
  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [customerRef, setCustomerRef] = useState([]);
  const [productRef, setProductRef] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [closeAll, setCloseAll] = useState(false);
  const dispatch = useDispatch();

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderItems: (order && order.orderItems) || [],
      billingName:
        (order && {
          value: order.customerId._id,
          label: order.customerId.username,
        }) ||
        {},
      shippingAddress1: (order && order.shippingAddress1) || "",
      shippingAddress2: (order && order.shippingAddress2) || "",
      paymentStatus: (order && order.paymentStatus) || "Paid",
      badgeclass: (order && order.badgeclass) || "success",
      paymentMethod: (order && order.paymentMethod) || "Mastercard",
      city: (order && order.city) || "",
      state: (order && order.state) || "",
      country: (order && order.country) || "",
      phone: (order && order.phone) || "",
      zip: (order && order.zip) || "",
      methodIcon: (order && order.methodIcon) || "fa-cc-mastercard",
    },
    validationSchema: Yup.object({
      billingName: Yup.object().shape({
        value: Yup.string().required("Please select a customer"),
        label: Yup.string().required("Please select a customer"),
      }),
      shippingAddress1: Yup.string().required(
        "Please Enter Your shipping address 1"
      ),
      shippingAddress2: Yup.string().required(
        "Please Enter Your shipping address 2"
      ),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
      city: Yup.string().required("Please Enter Your city"),
      state: Yup.string().required("Please Enter Your state"),
      country: Yup.string().required("Please Enter Your country"),
      phone: Yup.string().required("Please Enter Your phone"),
      zip: Yup.string().required("Please Enter Your zip"),
      methodIcon: Yup.string().required("Please Enter Your methodIcon "),
      orderItems: Yup.array()
        .of(
          Yup.object().shape({
            quantity: Yup.number().required("Please enter product quantity"),
            product: Yup.object().shape({
              _id: Yup.string().required("Please select a product"),
            }),
          })
        )
        .min(1, "Please select atleast one product")
        .required("Please select atleast one product."),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateOrder = {
          ...order,
          customerId: values.billingName,
          shippingAddress1: values.shippingAddress1,
          shippingAddress2: values.shippingAddress2,
          paymentStatus: values.paymentStatus,
          paymentMethod: values.paymentMethod,
          badgeclass: values.badgeclass,
          city: values.city,
          state: values.state,
          country: values.country,
          phone: values.phone,
          zip: values.zip,
          methodIcon: values.methodIcon,
          orderItems: values.orderItems,
        };
        dispatch(onUpdateOrder(updateOrder));

        validation.resetForm();
      } else {
        const newOrder = {
          orderItems: values["orderItems"],
          customerId: values["billingName"].value,
          shippingAddress1: values["shippingAddress1"],
          shippingAddress2: values["shippingAddress2"],
          paymentStatus: values["paymentStatus"],
          paymentMethod: values["paymentMethod"],
          badgeclass: values["badgeclass"],
          city: values["city"],
          state: values["state"],
          country: values["country"],
          methodIcon: "fa-cc-mastercard",
          phone: values["phone"],
          zip: values["zip"],
        };
        dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      }
      toggle();
    },
    handleError: e => {},
  });

  const validation2 = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "",
      phone: "",
      email: "",
      address: "",
      rating: "",
      walletBalance: "",
      joiningDate: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Name"),
      phone: Yup.string().required("Please Enter Your Phone"),
      email: Yup.string().required("Please Enter Your Email"),
      address: Yup.string().required("Please Enter Your Address"),
      rating: Yup.string().required("Please Enter Your Rating"),
      walletBalance: Yup.string().required("Please Enter Your Wallet Balance"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
    }),
    onSubmit: values => {
      const newCustomer = {
        username: values["username"],
        phone: values["phone"],
        email: values["email"],
        address: values["address"],
        rating: values["rating"],
        walletBalance: values["walletBalance"],
        joiningDate: values["joiningDate"],
      };
      dispatch(addNewCustomer(newCustomer));
      validation2.resetForm();
      toggleNested();
    },
  });

  const toggleViewModal = () => setModal1(!modal1);

  const { orders, products, customers } = useSelector(state => ({
    orders: state.ecommerce.orders,
    products: state.ecommerce.productList,
    customers: state.ecommerce.customers,
  }));

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders());
    }
  }, [dispatch, orders]);

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(getCustomers());
    }
  }, []);

  useEffect(() => {
    if (products && !products.length) {
      dispatch(getProductListdata());
    }
  }, []);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  useEffect(() => {
    setProductList(products);
    setProductOptions(
      products
        .filter(product =>
          validation.values.orderItems.every(
            entry => entry.product._id !== product._id
          )
        )
        .map(product => ({ value: product._id, label: product.name }))
    );
    let test = {};
    products.forEach(product => {
      test = { ...test, [product._id]: product.name };
    });
    setProductRef(test);
  }, [products, validation.values]);

  useEffect(() => {
    setCustomerList(
      customers.map(customer => ({
        id: customer._id,
        key: customer._id,
        value: customer._id,
        label: customer.username,
      }))
    );

    let test = {};
    customers.forEach(customer => {
      test = { ...test, [customer._id]: customer.username };
    });
    setCustomerRef(test);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders);
      setIsEdit(false);
    }
  }, [orders]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  const handleOrderClick = arg => {
    const order = arg;
    setOrder({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
    });

    setIsEdit(true);

    toggle();
  };

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const onClickDelete = (order) => {
    setOrder(order);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (order && order.id) {
      dispatch(onDeleteOrder(order.id));
      setDeleteModal(false);
    }
  };
  const handleOrderClicks = () => {
    setOrderList("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [

      {
        Header: 'Order ID',
        accessor: 'orderId',
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: (cellProps) => {
          return <OrderId {...cellProps} />;
        }
      },
      {
        Header: 'Billing Name',
        accessor: 'customerId',
        filterable: true,
        Cell: (cellProps) => {
          return <BillingName {...cellProps} />;
        }
      },
      {
        Header: 'Address',
        accessor: 'shippingAddress1',
        filterable: true,
        Cell: (cellProps) => {
          return <Date {...cellProps} />;
        }
      },
      {
        Header: 'Total',
        accessor: 'total',
        filterable: true,
        Cell: (cellProps) => {
          return <Total {...cellProps} />;
        }
      },
      {
        Header: 'Payment Status',
        accessor: 'paymentStatus',
        filterable: true,
        Cell: (cellProps) => {
          return <PaymentStatus {...cellProps} />;
        }
      },
      {
        Header: 'Payment Method',
        accessor: 'paymentMethod',
        Cell: (cellProps) => {
          return <PaymentMethod {...cellProps} />;
        }
      },
      {
        Header: 'View Details',
        accessor: 'view',
        disableFilters: true,
        Cell: () => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={toggleViewModal}
            >
              View Details
            </Button>);
        }
      },
      {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  handleOrderClick(orderData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickDelete(orderData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        }
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={orders}
                    isGlobalFilter={true}
                    isAddOptions={true}
                    handleOrderClicks={handleOrderClicks}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Order" : "Add Order"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Order Id</Label>
                      <Input
                        name="orderId"
                        type="text"
                        placeholder="Insert Order Id"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.orderId || ""}
                        invalid={
                          validation.touched.orderId && validation.errors.orderId ? true : false
                        }
                      />
                      {validation.touched.orderId && validation.errors.orderId ? (
                        <FormFeedback type="invalid">{validation.errors.orderId}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Billing Name</Label>
                      <Input
                        name="billingName"
                        type="text"
                        placeholder="Insert Billing Name"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.billingName || ""}
                        invalid={
                          validation.touched.billingName && validation.errors.billingName ? true : false
                        }
                      />
                      {validation.touched.billingName && validation.errors.billingName ? (
                        <FormFeedback type="invalid">{validation.errors.billingName}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Order Date</Label>
                      <Input
                        name="orderdate"
                        type="date"
                        // value={orderList.orderdate || ""}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.orderdate || ""}
                        invalid={
                          validation.touched.orderdate && validation.errors.orderdate ? true : false
                        }
                      />
                      {validation.touched.orderdate && validation.errors.orderdate ? (
                        <FormFeedback type="invalid">{validation.errors.orderdate}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Total</Label>
                      <Input
                        name="total"
                        type="text"
                        placeholder="Insert Total Amount"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.total || ""}
                        invalid={
                          validation.touched.total && validation.errors.total ? true : false
                        }
                      />
                      {validation.touched.total && validation.errors.total ? (
                        <FormFeedback type="invalid">{validation.errors.total}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Payment Status</Label>
                      <Input
                        name="paymentStatus"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.paymentStatus || ""
                        }
                      >
                        <option>Paid</option>
                        <option>Chargeback</option>
                        <option>Refund</option>
                      </Input>
                      {validation.touched.paymentStatus && validation.errors.paymentStatus ? (
                        <FormFeedback type="invalid">{validation.errors.paymentStatus}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Badge Class</Label>
                      <Input
                        name="badgeclass"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.badgeclass || ""}
                      >
                        <option>success</option>
                        <option>danger</option>
                        <option>warning</option>
                      </Input>
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Payment Method</Label>
                      <Input
                        name="paymentMethod"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.paymentMethod || ""
                        }
                      >
                        <option>Mastercard</option>
                        <option>Visa</option>
                        <option>Paypal</option>
                        <option>COD</option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
}
EcommerceOrder.propTypes = {
  preGlobalFilteredRows: PropTypes.any,

};


export default EcommerceOrder;