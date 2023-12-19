import React, { useEffect, useState } from "react"

import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Label,
    CardTitle,
    FormFeedback,
    Button,
} from "reactstrap"
import { Link } from "react-router-dom"
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux"
import { getCarModels } from "store/automobiles/carModels/actions"
import { useFormik } from "formik"

const BasicCarVariant = ({ onValidChange, onFormValuesChange, onFormSubmit }) => {

    //meta title
    document.title = "Add Car Variant | Scrollit";

    const dispatch = useDispatch();

    const [carVariant, setCarVariant] = useState([]);
    const [switch1, setswitch1] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    // const [carModelsList, setCarModelsList] = useState([]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            variantName: (carVariant && carVariant.variantName) || "",
            carModel: (carVariant && carVariant._id) || "",
            variantStatus: (carVariant && carVariant.status ? 'Active' : 'InActive') || "",
            onRoadPrice: (carVariant && carVariant.basicInformation && carVariant.basicInformation.onRoadPrice) || "",
            userRating: (carVariant && carVariant.basicInformation && carVariant.basicInformation.userRating) || "",
            startEmiAmount: (carVariant && carVariant.basicInformation && carVariant.basicInformation.startEmiAmount) || "",
            startInsuranceAmount: (carVariant && carVariant.basicInformation && carVariant.basicInformation.startInsuranceAmount) || "",
            serviceCost: (carVariant && carVariant.basicInformation && carVariant.basicInformation.serviceCost) || "",
        },
        validationSchema: Yup.object({
            variantName: Yup.string().required(
                "Please Enter Your Variant Name"
            ),
            carModel: Yup.string().required(
                "Please Enter Your CarModel"
            ),
            variantStatus: Yup.string().required(
                "Please Enter Your Variant Status"
            ),
            onRoadPrice: Yup.string().required(
                "Please Enter Your on Road Price"
            ),
            userRating: Yup.string().required(
                "Please Enter Your User Rating"
            ),
            startEmiAmount: Yup.string().required(
                "Please Enter Your Start Emi Amount"
            ),
            startInsuranceAmount: Yup.string().required(
                "Please Enter Your Start Insurance Amount"
            ),
            serviceCost: Yup.string().required(
                "Please Enter Your Service Cost"
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
                if (onFormSubmit) {
                    const basicInformation = {
                        onRoadPrice: values.onRoadPrice,
                        userRating: values.userRating,
                        startEmiAmount: values.startEmiAmount,
                        startInsuranceAmount: values.startInsuranceAmount,
                        serviceCost: values.serviceCost
                    }
                    const basicCarData = {
                        name: values.variantName,
                        carModel: values.carModel,
                        status: values.variantStatus,
                        basicInformation
                    }
                    onFormSubmit(basicCarData);
                }
            }
            toggle();
        },
        handleError: e => { },
    });

    const { carModels } = useSelector(state => ({
        carModels: state.CarModel.carModels
    }));

    useEffect(() => {
        if (carModels && !carModels.length) {
            dispatch(getCarModels());
        }
    }, [dispatch, carModels]);

    return (
        <React.Fragment>
            <div>
                <CardTitle>Basic information</CardTitle>
                <p className="card-title-desc">
                    Fill all information below
                </p>
                <Form onSubmit={validation.handleSubmit}>
                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="variantName"
                            md="2"
                            className="col-form-label"
                        >
                            Variant Name <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="variantName"
                                id="variantName"
                                placeholder="Enter your Variant name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.variantName}
                            />
                            {validation.touched
                                .variantName &&
                                validation.errors
                                    .variantName ? (
                                <FormFeedback type="invalid">
                                    {
                                        validation.errors
                                            .variantName
                                    }
                                </FormFeedback>
                            ) : null}
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
                                value={validation.values.variantStatus}
                            >
                                <option>Active</option>
                                <option>InActive</option>
                            </Input>

                            {validation.touched
                                .status &&
                                validation.errors
                                    .variantStatus ? (
                                <FormFeedback type="invalid">
                                    {
                                        validation.errors
                                            .variantStatus
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
                    <Button type="submit" color="primary">Next</Button>
                </Form>
            </div>


        </React.Fragment>
    )
}

export default BasicCarVariant
