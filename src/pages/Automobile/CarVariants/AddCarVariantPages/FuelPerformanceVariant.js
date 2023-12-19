import React, { useEffect, useState } from "react"

import {
    Container,
    Row,
    Col,
    Table,
    Input,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Card,
    Form,
    FormGroup,
    Label,
    CardBody,
    CardTitle,
    CardSubtitle,
    FormFeedback,
    Button,
} from "reactstrap"
import Select from "react-select"
import { Link } from "react-router-dom"
import * as Yup from "yup";

import classnames from "classnames"

import { useSelector, useDispatch } from "react-redux"
import { getCarModels } from "store/automobiles/carModels/actions"
import { useFormik } from "formik"
import Switch from "react-switch";

const Offsymbol = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 12,
                color: "#fff",
                paddingRight: 2
            }}
        >
            {" "}
            No
        </div>
    );
};

const OnSymbol = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 12,
                color: "#fff",
                paddingRight: 2
            }}
        >
            {" "}
            Yes
        </div>
    );
};


const FuelPerformanceVariant = ({ onFormSubmit }) => {

    //meta title
    document.title = "Add Car Variant | Scrollit";

    const dispatch = useDispatch();

    const [activeTab, setactiveTab] = useState("1")
    const [selectedGroup, setselectedGroup] = useState(null)

    const [carVariant, setCarVariant] = useState([]);
    const [switch1, setswitch1] = useState(true);
    // const [carModelsList, setCarModelsList] = useState([]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            fuelType: (carVariant && carVariant.fuelAndPerformance && carVariant.fuelAndPerformance.fuelType) || "",
            mileageCity: (carVariant && carVariant.fuelAndPerformance && carVariant.fuelAndPerformance.mileageCity) || "",
            mileageArai: (carVariant && carVariant.fuelAndPerformance && carVariant.fuelAndPerformance.mileageArai) || "",
            fuelTankCapacity: (carVariant && carVariant.fuelAndPerformance && carVariant.fuelAndPerformance.fuelTankCapacity) || "",
            emissionNormCompliance: (carVariant && carVariant.fuelAndPerformance && carVariant.fuelAndPerformance.emissionNormCompliance) || "",
        },
        // validationSchema: Yup.object({
        //     modelName: Yup.string().required(
        //         "Please Enter Your Brand Name"
        //     ),
        //     carBrand: Yup.string().required(
        //         "Please Enter Your CarBrand"
        //     ),
        //     description: Yup.string().required(
        //         "Please Enter Your description"
        //     ),
        //     year: Yup.string().required(
        //         "Please Enter Your Year"
        //     ),
        //     status: Yup.string().required(
        //         "Please Enter Your Status"
        //     )
        // }),
        onSubmit: values => {
            console.log('values ', values);
            toggle();
        },
        handleError: e => { },
    });

    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup)
    }

    // useEffect(() => {
    //     setCarModelsList(carModels);
    // }, [carModels]);

    return (
        <React.Fragment>
            <div>
                <CardTitle>Fuel And Performance</CardTitle>
                <p className="card-title-desc">
                    Fill all information below
                </p>
                <Form onSubmit={validation.handleSubmit}>
                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="fuelType"
                            md="2"
                            className="col-form-label"
                        >
                            Fuel Type <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="fuelType"
                                id="fuelType"
                                placeholder="Enter your Fuel Type"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.fuelType}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="mileageCity"
                            md="2"
                            className="col-form-label"
                        >
                            City Mileage <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="mileageCity"
                                id="mileageCity"
                                placeholder="Enter your Mileage City"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.mileageCity}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="mileageArai"
                            md="2"
                            className="col-form-label"
                        >
                            Arai Mileage <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="mileageArai"
                                id="mileageArai"
                                placeholder="Enter your Mileage Arai"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.mileageArai}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="fuelTankCapacity"
                            md="2"
                            className="col-form-label"
                        >
                            Fuel Tank Capacity <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="fuelTankCapacity"
                                id="fuelTankCapacity"
                                placeholder="Enter your Fuel Tank Capacity"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.fuelTankCapacity}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="emissionNormCompliance"
                            md="2"
                            className="col-form-label"
                        >
                            Emission Norm Compliance <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="emissionNormCompliance"
                                id="emissionNormCompliance"
                                placeholder="Enter your Emission Norm Compliance"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.emissionNormCompliance}
                            />
                        </Col>
                    </FormGroup>
                    <Button type="submit" color="primary">Next</Button>
                </Form>




                {/* <Row className="mt-4">
                                    <Col sm="6">
                                        <Link
                                            to="/ecommerce-cart"
                                            className="btn text-muted d-none d-sm-inline-block btn-link"
                                        >
                                            <i className="mdi mdi-arrow-left me-1" /> Back to
                                            Shopping Cart{" "}
                                        </Link>
                                    </Col>
                                    <Col sm="6">
                                        <div className="text-sm-end btn btn-success">
                                            <Link
                                                to="/add-car-variant"
                                                className="btn btn-success"
                                            >
                                                <i className="mdi mdi-truck-fast me-1" /> Proceed to
                                                Shipping{" "}
                                            </Link>
                                        </div>
                                    </Col>
                                </Row> */}


            </div>
        </React.Fragment>
    )
}

export default FuelPerformanceVariant
