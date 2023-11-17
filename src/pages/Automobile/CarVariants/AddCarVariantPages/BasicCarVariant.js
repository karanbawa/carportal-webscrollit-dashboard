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
} from "reactstrap"
import Select from "react-select"
import { Link } from "react-router-dom"
import * as Yup from "yup";

import classnames from "classnames"

//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb"

//Import Images
import img1 from "../../../../assets/images/product/img-1.png"
import img7 from "../../../../assets/images/product/img-7.png"
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

const optionGroup = [
    {
        label: "Picnic",
        options: [
            { label: "Mustard", value: "Mustard" },
            { label: "Ketchup", value: "Ketchup" },
            { label: "Relish", value: "Relish" },
        ],
    },
    {
        label: "Camping",
        options: [
            { label: "Tent", value: "Tent" },
            { label: "Flashlight", value: "Flashlight" },
            { label: "Toilet Paper", value: "Toilet Paper" },
        ],
    },
]

const orderSummary = [
    {
        id: 1,
        img: img1,
        productTitle: "Half sleeve T-shirt (64GB)",
        price: 450,
        qty: 1,
    },
    { id: 2, img: img7, productTitle: "Wireless Headphone", price: 225, qty: 1 },
]

const BasicCarVariant = () => {

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
            variantName: (carVariant && carVariant.variantName) || "",
            carModel: (carVariant && carVariant._id) || "",
            variantStatus: (carVariant && carVariant.status) || "",
            onRoadPrice: (carVariant && carVariant.basicInformation && carVariant.basicInformation.onRoadPrice) || "",
            userRating: (carVariant && carVariant.basicInformation && carVariant.basicInformation.userRating) || "",
            startEmiAmount: (carVariant && carVariant.basicInformation && carVariant.basicInformation.startEmiAmount) || "",
            startInsuranceAmount: (carVariant && carVariant.basicInformation && carVariant.basicInformation.startInsuranceAmount) || "",
            serviceCost: (carVariant && carVariant.basicInformation && carVariant.basicInformation.serviceCost) || "",
        },
        validationSchema: Yup.object({
            modelName: Yup.string().required(
                "Please Enter Your Brand Name"
            ),
            carBrand: Yup.string().required(
                "Please Enter Your CarBrand"
            ),
            description: Yup.string().required(
                "Please Enter Your description"
            ),
            year: Yup.string().required(
                "Please Enter Your Year"
            ),
            status: Yup.string().required(
                "Please Enter Your Status"
            )
        }),
        onSubmit: values => {
            if (isEdit) {
                const updCarModel = new FormData();
                updCarModel.append("modelName", values["modelName"]);
                updCarModel.append("description", values["description"]);
                updCarModel.append("year", values["year"]);
                updCarModel.append("status", values["status"] === 'Active' ? true : false);
                updCarModel.append("image", modelImage ? modelImage : "broken!");
                dispatch(updateCarModel(carModel._id, values['carBrand'], updCarModel));

                validation.resetForm();
            } else {
                const newCarModel = new FormData();
                newCarModel.append("modelName", values["modelName"]);
                newCarModel.append("description", values["description"]);
                newCarModel.append("year", values["year"]);
                newCarModel.append("status", values["status"] === 'Active' ? true : false);
                newCarModel.append("image", modelImage ? modelImage : "broken!");
                dispatch(addNewCarModel(values['carBrand'], newCarModel));
                validation.resetForm();
            }
            toggle();
        },
        handleError: e => { },
    });

    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup)
    }

    const { carBrands, countries, carModels } = useSelector(state => ({
        carModels: state.CarModel.carModels
    }));

    useEffect(() => {
        if (carModels && !carModels.length) {
            dispatch(getCarModels());
        }
    }, [dispatch]);

    // useEffect(() => {
    //     setCarModelsList(carModels);
    // }, [carModels]);

    return (
        <React.Fragment>
                                                <div>
                                                    <CardTitle>Basic information</CardTitle>
                                                    <p className="card-title-desc">
                                                        Fill all information below
                                                    </p>
                                                    <Form>
                                                        <FormGroup className="mb-4" row>
                                                            <Label
                                                                htmlFor="billing-name"
                                                                md="2"
                                                                className="col-form-label"
                                                            >
                                                                Name <span style={{ color: 'red' }}>*</span>
                                                            </Label>
                                                            <Col md="10">
                                                                <Input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="billing-name"
                                                                    placeholder="Enter your name"
                                                                />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup className="mb-4" row>
                                                            <Label className="form-label" md="2">
                                                                Car Model <span style={{ color: 'red' }}>*</span>
                                                            </Label>
                                                            <Col md="10">
                                                                <Input
                                                                    type="select"
                                                                    name="carModel"
                                                                    id="carModel"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.carModel}
                                                                >
                                                                    <option value="">Select a Car Brand</option>
                                                                    {carModels?.map((carModel, index) => (
                                                                        <option key={index} value={carModel._id}>
                                                                            {carModel.modelName}
                                                                        </option>
                                                                    ))}
                                                                </Input>

                                                                {validation.touched
                                                                    .carModel &&
                                                                    validation.errors
                                                                        .carModel ? (
                                                                    <FormFeedback type="invalid">
                                                                        {
                                                                            validation.errors
                                                                                .carModel
                                                                        }
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup className="mb-4" row>
                                                            <Label className="form-label" md="2">
                                                                Status <span style={{ color: 'red' }}>*</span>
                                                            </Label>
                                                            <Col md="10">
                                                                <Input
                                                                    type="select"
                                                                    name="variantStatus"
                                                                    id="variantStatus"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.status}
                                                                >
                                                                    <option>Active</option>
                                                                    <option>InActive</option>
                                                                </Input>

                                                                {validation.touched
                                                                    .status &&
                                                                    validation.errors
                                                                        .status ? (
                                                                    <FormFeedback type="invalid">
                                                                        {
                                                                            validation.errors
                                                                                .status
                                                                        }
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup className="mb-4" row>
                                                            <Label className="form-label" md="2">
                                                                On Road Price <span style={{ color: 'red' }}>*</span>
                                                            </Label>
                                                            <Col md="10">
                                                                <Input
                                                                    type="text"
                                                                    name="onRoadPrice"
                                                                    id="onRoadPrice"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.onRoadPrice}
                                                                >
                                                                </Input>

                                                                {validation.touched
                                                                    .onRoadPrice &&
                                                                    validation.errors
                                                                        .onRoadPrice ? (
                                                                    <FormFeedback type="invalid">
                                                                        {
                                                                            validation.errors
                                                                                .onRoadPrice
                                                                        }
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup className="mb-4" row>
                                                            <Label className="form-label" md="2">
                                                                User Rating <span style={{ color: 'red' }}>*</span>
                                                            </Label>
                                                            <Col md="10">
                                                                <Input
                                                                    type="number"
                                                                    name="userRating"
                                                                    id="userRating"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.userRating}
                                                                >
                                                                </Input>

                                                                {validation.touched
                                                                    .userRating &&
                                                                    validation.errors
                                                                        .userRating ? (
                                                                    <FormFeedback type="invalid">
                                                                        {
                                                                            validation.errors
                                                                                .userRating
                                                                        }
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup className="mb-4" row>
                                                            <Label className="form-label" md="2">
                                                                Start EMI Amount <span style={{ color: 'red' }}>*</span>
                                                            </Label>
                                                            <Col md="10">
                                                                <Input
                                                                    type="text"
                                                                    name="startEmiAmount"
                                                                    id="startEmiAmount"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.startEmiAmount}
                                                                >
                                                                </Input>

                                                                {validation.touched
                                                                    .startEmiAmount &&
                                                                    validation.errors
                                                                        .startEmiAmount ? (
                                                                    <FormFeedback type="invalid">
                                                                        {
                                                                            validation.errors
                                                                                .startEmiAmount
                                                                        }
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup className="mb-4" row>
                                                            <Label className="form-label" md="2">
                                                                Start Insurance Amount <span style={{ color: 'red' }}>*</span>
                                                            </Label>
                                                            <Col md="10">
                                                                <Input
                                                                    type="text"
                                                                    name="startInsuranceAmount"
                                                                    id="startInsuranceAmount"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.startInsuranceAmount}
                                                                >
                                                                </Input>

                                                                {validation.touched
                                                                    .startInsuranceAmount &&
                                                                    validation.errors
                                                                        .startInsuranceAmount ? (
                                                                    <FormFeedback type="invalid">
                                                                        {
                                                                            validation.errors
                                                                                .startInsuranceAmount
                                                                        }
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup className="mb-4" row>
                                                            <Label className="form-label" md="2">
                                                                Service Cost <span style={{ color: 'red' }}>*</span>
                                                            </Label>
                                                            <Col md="10">
                                                                <Input
                                                                    type="text"
                                                                    name="serviceCost"
                                                                    id="serviceCost"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.serviceCost}
                                                                >
                                                                </Input>

                                                                {validation.touched
                                                                    .serviceCost &&
                                                                    validation.errors
                                                                        .serviceCost ? (
                                                                    <FormFeedback type="invalid">
                                                                        {
                                                                            validation.errors
                                                                                .serviceCost
                                                                        }
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </Col>
                                                        </FormGroup>
                                                    </Form>
                                                </div>
                                <Row className="mt-4">
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
                                </Row>
                    
        </React.Fragment>
    )
}

export default BasicCarVariant
