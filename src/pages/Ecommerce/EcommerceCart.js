import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  CardTitle
} from "reactstrap";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { productListvar } from "../../common/data";

const EcommerceCart = () => {

  //meta title
  document.title = "Cart | Scrollit";

  const [productList, setproductList] = useState(productListvar);

  function removeCartItem(id) {
    var filtered = productList.filter(function (item) {
      return item.id !== id;
    });

    setproductList(filtered);
  }

  function countUP(id, prev_data_attr) {
    setproductList(
      productList.map(p =>
        p.id === id ? { ...p, data_attr: prev_data_attr + 1 } : p
      )
    );
  }

  function countDown(id, prev_data_attr) {
    setproductList(
      productList.map(p =>
        p.id === id ? { ...p, data_attr: prev_data_attr - 1 } : p
      )
    );
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Cart" />

          <Row>
            <Col xl={8}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table align-middle mb-0 table-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th>Product Desc</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th colSpan="2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList.map(product => (
                          <tr key={product.id}>
                            <td>
                              <img
                                src={product.img}
                                alt="product-img"
                                title="product-img"
                                className="avatar-md"
                              />
                            </td>
                            <td>
                              <h5 className="font-size-14 text-truncate">
                                <Link
                                  to={"/ecommerce-product-detail/" + product.id}
                                  className="text-dark"
                                >
                                  {product.name}
                                </Link>
                              </h5>
                              <p className="mb-0">
                                Color :{" "}
                                <span className="fw-medium">
                                  {product.color}
                                </span>
                              </p>
                            </td>
                            <td>$ {product.price}</td>
                            <td>
                              <div style={{ width: "120px" }}>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => {
                                        countUP(product.id, product.data_attr);
                                      }}>+
                                    </button>
                                  </div>
                                  <Input
                                    type="text"
                                    value={product.data_attr}
                                    name="demo_vertical"
                                    readOnly
                                  />
                                  <div className="input-group-append">
                                    <button type="button" className="btn btn-primary"
                                      onClick={() => {
                                        countDown(product.id, product.data_attr);
                                      }}>-</button>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>$ {product.total}</td>
                            <td>
                              <Link
                                to="#"
                                onClick={() => removeCartItem(product.id)}
                                className="action-icon text-danger"
                              >
                                {" "}
                                <i className="mdi mdi-trash-can font-size-18" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Row className="mt-4">
                    <Col sm="6">
                      <Link
                        to="/ecommerce-products"
                        className="btn btn-secondary"
                      >
                        <i className="mdi mdi-arrow-left me-1" /> Continue
                        Shopping{" "}
                      </Link>
                    </Col>
                    <Col sm="6">
                      <div className="text-sm-end mt-2 mt-sm-0">
                        <Link
                          to="/ecommerce-checkout"
                          className="btn btn-success"
                        >
                          <i className="mdi mdi-cart-arrow-right me-1" />{" "}
                          Checkout{" "}
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card Details</CardTitle>

                  <div className="card bg-primary text-white visa-card mb-0">
                    <CardBody>
                      <div>
                        <i className="bx bxl-visa visa-pattern" />

                        <div className="float-end">
                          <i className="bx bxl-visa visa-logo display-3" />
                        </div>

                        <div>
                          <i className="bx bx-chip h1 text-warning" style={{lineHeight:1}} />
                        </div>
                      </div>

                      <Row className="mt-5">
                        <Col className="col-4">
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                        <Col className="col-4">
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                        <Col className="col-4">
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                      </Row>

                      <div className="mt-5">
                        <h5 className="text-white float-end mb-0">12/22</h5>
                        <h5 className="text-white mb-0">Fredrick Taylor</h5>
                      </div>
                    </CardBody>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Order Summary</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>Grand Total :</td>
                          <td>$ 1,857</td>
                        </tr>
                        <tr>
                          <td>Discount : </td>
                          <td>- $ 157</td>
                        </tr>
                        <tr>
                          <td>Shipping Charge :</td>
                          <td>$ 25</td>
                        </tr>
                        <tr>
                          <td>Estimated Tax : </td>
                          <td>$ 19.22</td>
                        </tr>
                        <tr>
                          <th>Total :</th>
                          <th>$ 1744.22</th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCart;
