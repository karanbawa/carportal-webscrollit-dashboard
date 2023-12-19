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
import Breadcrumbs from "../../../components/Common/Breadcrumb"

//Import Images
import img1 from "../../../assets/images/product/img-1.png"
import img7 from "../../../assets/images/product/img-7.png"
import { useSelector, useDispatch } from "react-redux"
import { getCarModels } from "store/automobiles/carModels/actions"
import { useFormik } from "formik"
import Switch from "react-switch";
import BasicCarVariant from "./AddCarVariantPages/BasicCarVariant";
import EngineAndTransmissionVariant from "./AddCarVariantPages/EngineAndTransmissionVariant";
import FuelPerformanceVariant from "./AddCarVariantPages/FuelPerformanceVariant";
import SuspensionSteeringBrakesVariant from "./AddCarVariantPages/SuspensionSteeringBrakesVariant";
import DimensionAndCapacityVariant from "./AddCarVariantPages/DimensionAndCapacityVariant";
import ComfortAndConvenienceVariant from "./AddCarVariantPages/ComfortAndConvenienceVariant";
import InteriorVariant from "./AddCarVariantPages/InteriorVariant";
import ExteriorVariant from "./AddCarVariantPages/ExteriorVariant";
import SafetyVariant from "./AddCarVariantPages/SafetyVariant";

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

const AddCarVariant = () => {

    //meta title
    document.title = "Add Car Variant | Scrollit";

    const dispatch = useDispatch();

    const [activeTab, setactiveTab] = useState("1");
    const [allValid, setAllValid] = useState(false);
    const [selectedGroup, setselectedGroup] = useState(null)

    const [carVariant, setCarVariant] = useState([]);
    const [switch1, setswitch1] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        carModel: '',
        basicInformation: {},
        engineAndTransmission: {},
        fuelAndPerformance: {},
        suspensionAndSteeringAndBrakes: {},
        dimensionAndCapacity: {},
        comfortAndConvenience: {},
        interior: {},
        exterior: {},
        safety: {},
        entertainmentAndCommunication: {},
        warranty: {},
        status: {},
        media: []
    });
    // const [carModelsList, setCarModelsList] = useState([]);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    // Validate all sections
    const validateAllSections = (basicValid, engineValid) => {
        setAllValid(basicValid && engineValid);
    };

    const handleFinalSubmit = () => {
        // Aggregate data from both forms
        const completeFormData = {
            ...basicFormData,  // Data from Basic Information Form
            ...engineFormData  // Data from Engine and Transmission Form
        };
    };

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            puddleLamps: (carVariant && carVariant.exterior && carVariant.exterior.puddleLamps) ? carVariant.exterior.puddleLamps : false,
            tyreSize: (carVariant && carVariant.exterior && carVariant.exterior.tyreSize) || "",
            tyreType: (carVariant && carVariant.exterior && carVariant.exterior.tyreType) || "",
            wheelSize: (carVariant && carVariant.exterior && carVariant.exterior.wheelSize) || "",
            allowWheelSize: (carVariant && carVariant.exterior && carVariant.exterior.allowWheelSize) ? carVariant.exterior.allowWheelSize : false,

            allowWheelSize: (carVariant && carVariant.exterior && carVariant.exterior.allowWheelSize) ? carVariant.exterior.allowWheelSize : false,
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

    const handleFormValuesChange = (data) => {
        console.log('data ', data);
    }

    const handleBasicCarFormSubmit = (formData) => {
        console.log("Form Data Received value data:", formData);
        // formData.append();
        setactiveTab("2");
        // setFormData();
    };

    const handleFormSubmit = (formData) => {
        console.log('formData');
    }

    // useEffect(() => {
    //     setCarModelsList(carModels);
    // }, [carModels]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs title="Car Variant" breadcrumbItem="Add Car Variant" />

                    <div className="checkout-tabs">
                        <Row>
                            <Col lg={3} sm="3">
                                <Card>
                                    <CardBody>
                                        <ul className="list-unstyled vstack gap-3 mb-0">
                                            <Nav className="flex-column" pills>

                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "1" })}
                                                        onClick={() => {
                                                            setactiveTab("1")
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            {/* <i className='bx bx-calendar font-size-18 text-primary'></i> */}
                                                            <i className="bx bxs-truck d-block font-size-18 check-nav-icon" />
                                                            <div className="ms-3">
                                                                <span className="fw-bold">Basic Information</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>

                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "2" })}
                                                        onClick={() => {
                                                            setactiveTab("2")
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            {/* <i className='bx bx-calendar font-size-18 text-primary'></i> */}
                                                            <i className="bx bxs-truck d-block font-size-18 check-nav-icon" />
                                                            <div className="ms-3">
                                                                <span className="fw-bold">Engine & Transmission</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>


                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "3" })}
                                                        onClick={() => {
                                                            setactiveTab("3")
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            {/* <i className='bx bx-calendar font-size-18 text-primary'></i> */}
                                                            <i className="bx bxs-truck d-block font-size-18 check-nav-icon" />
                                                            <div className="ms-3">
                                                                <span className="fw-bold">Fuel & Performance</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>


                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "4" })}
                                                        onClick={() => {
                                                            setactiveTab("4")
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            {/* <i className='bx bx-calendar font-size-18 text-primary'></i> */}
                                                            <i className="bx bxs-truck d-block font-size-18 check-nav-icon" />
                                                            <div className="ms-3">
                                                                <span className="fw-bold">Suspension & Steering</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>


                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "5" })}
                                                        onClick={() => {
                                                            setactiveTab("5")
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            {/* <i className='bx bx-calendar font-size-18 text-primary'></i> */}
                                                            <i className="bx bxs-truck d-block font-size-18 check-nav-icon" />
                                                            <div className="ms-3">
                                                                <span className="fw-bold">Dimension & Capacity</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>


                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "6" })}
                                                        onClick={() => {
                                                            setactiveTab("6")
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            {/* <i className='bx bx-calendar font-size-18 text-primary'></i> */}
                                                            <i className="bx bxs-truck d-block font-size-18 check-nav-icon" />
                                                            <div className="ms-3">
                                                                <span className="fw-bold">Comfort & Convinience</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>


                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "7" })}
                                                        onClick={() => {
                                                            setactiveTab("7")
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            {/* <i className='bx bx-calendar font-size-18 text-primary'></i> */}
                                                            <i className="bx bxs-truck d-block font-size-18 check-nav-icon" />
                                                            <div className="ms-3">
                                                                <span className="fw-bold">Interior</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>


                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "8" })}
                                                        onClick={() => {
                                                            setactiveTab("8")
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            {/* <i className='bx bx-calendar font-size-18 text-primary'></i> */}
                                                            <i className="bx bxs-truck d-block font-size-18 check-nav-icon" />
                                                            <div className="ms-3">
                                                                <span className="fw-bold">Exterior</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>


                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTab === "9" })}
                                                        onClick={() => {
                                                            setactiveTab("9")
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            {/* <i className='bx bx-calendar font-size-18 text-primary'></i> */}
                                                            <i className="bx bxs-truck d-block font-size-18 check-nav-icon" />
                                                            <div className="ms-3">
                                                                <span className="fw-bold">Safety</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </ul>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="9" sm="9">
                                <Card>
                                    <CardBody>
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId="1">
                                                <BasicCarVariant onValidChange={(isValid) => validateAllSections(isValid, false)} onFormSubmit={handleBasicCarFormSubmit} />
                                            </TabPane>

                                            <TabPane
                                                tabId="2"
                                                id="v-pills-payment"
                                                role="tabpanel"
                                                aria-labelledby="v-pills-payment-tab"
                                            >
                                                <EngineAndTransmissionVariant onValidChange={(isValid) => validateAllSections(false, isValid)} onFormSubmit={handleFormSubmit} />
                                            </TabPane>

                                            <TabPane tabId="3" id="v-pills-confir" role="tabpanel">
                                                <FuelPerformanceVariant onValidChange={(isValid) => validateAllSections(false, isValid)} onFormSubmit={handleFormSubmit} />
                                            </TabPane>

                                            <TabPane tabId="4" id="v-pills-confir" role="tabpanel">
                                                <SuspensionSteeringBrakesVariant onFormSubmit={handleFormSubmit} />
                                            </TabPane>

                                            <TabPane tabId="5" id="v-pills-confir" role="tabpanel">
                                                <DimensionAndCapacityVariant onFormSubmit={handleFormSubmit} />
                                            </TabPane>

                                            <TabPane tabId="6" id="v-pills-confir" role="tabpanel">
                                                <ComfortAndConvenienceVariant onFormSubmit={handleFormSubmit} />
                                            </TabPane>

                                            <TabPane tabId="7" id="v-pills-confir" role="tabpanel">
                                                <InteriorVariant onFormSubmit={handleFormSubmit} />
                                            </TabPane>

                                            <TabPane tabId="8" id="v-pills-confir" role="tabpanel">
                                                <ExteriorVariant onFormSubmit={handleFormSubmit} />
                                            </TabPane>

                                            <TabPane tabId="9" id="v-pills-confir" role="tabpanel">
                                                <SafetyVariant onFormSubmit={handleFormSubmit} />
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                                <Row className="mt-4">
                                    {/* <Col sm="6">
                                        <Link
                                            to="/ecommerce-cart"
                                            className="btn text-muted d-none d-sm-inline-block btn-link"
                                        >
                                            <i className="mdi mdi-arrow-left me-1" /> Back to
                                            Shopping Cat{" "}
                                        </Link>
                                    </Col> */}
                                    <Col sm="6">
                                        <div className="text-sm-end btn btn-success">
                                            <Link
                                                to="/add-car-variant"
                                                className="btn btn-success"
                                            >
                                                <i className="mdi mdi-truck-fast me-1" /> Submit{" "}
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default AddCarVariant
