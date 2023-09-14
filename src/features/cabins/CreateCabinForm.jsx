/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useUser } from "../authentication/useUser";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { styled } from "styled-components";
import useFacilities from "./useFacilities";
import { useState } from "react";
import { HiX } from "react-icons/hi";

const ImagesContainer = styled.div`
    width: 100%;
    background-color: #f8f8f8;
    display: flex;
    gap: 10px;
    display: grid;
    padding: 10px;
    grid-template-columns: repeat(7, 1fr);

    margin: 10px 0 20px 0;
`;

const ImageItem = styled.div`
    height: 100%;
    width: 100&;
    border: 1px solid gainsboro;
    background-color: #fff;
    position: relative;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 4px;
        /* border: 1px solid gainsboro; */
        object-fit: cover;
    }
`;

const ImgContainer = styled.div`
    padding: 5px;
    height: 100%;
    width: 100%;
`;

const RemoveImg = styled.div`
    z-index: 3;
    position: absolute;
    right: -3px;
    top: -3px;
    border-radius: 50%;
    background-color: #fff;
    aspect-ratio: 1/1;
    background-color: #ff5a5a;
    width: 15px;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    cursor: pointer;

    padding: 2px;
    & svg {
        height: 100%;
        width: 100%;
    }
`;

const FacilityItem = styled.p`
    font-size: 1.3rem;
    color: #666;
`

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const [previewFiles, setPreviewFiles] = useState(() => {
        return cabinToEdit?.images || [];
    });

    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const { facilities } = useFacilities();

    const { user } = useUser();
    const userId = user.id;

    const isWorking = isEditing || isCreating;

    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const checkedFacilities =
        cabinToEdit?.cabins_facilities?.map((cabFac) => cabFac.facilities.id) ||
        [];

    function onSubmit(data) {
        // const image =
        //     typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession) {
            editCabin(
                { newCabinData: { ...data, images: previewFiles }, id: editId },
                {
                    onSuccess: () => {
                        onCloseModal?.();
                        // reset();
                    },
                }
            );
        } else {
            createCabin(
                { ...data, userId, images: previewFiles },
                {
                    onSuccess: () => {
                        // onCloseModal?.();
                        // reset();
                    },
                }
            );
        }
    }

    function onError(errors) {
        console.log(errors);
    }

    function atLeastOne() {
        return getValues().facilities.length > 0 || "Check at least one";
    }

    function handleFileChange(e) {
        const { files } = e.target;
        const selectedFiles = Array.from(files).map((file) => {
            return {
                file: file,
                url: URL.createObjectURL(file),
                name: file.name,
            };
        });

        const allowedSelectedFiles = selectedFiles.filter((selectedFile) => {
            return previewFiles.every(
                (prevFile) => prevFile.name !== selectedFile.name
            );
        });

        setPreviewFiles((prev) => {
            return [...prev, ...allowedSelectedFiles];
        });
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular "}
        >
            <FormRow label={"Cabin Name"} error={errors?.name?.message}>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label={"Title"} error={errors?.title?.message}>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="title"
                    {...register("title", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label={"Location"} error={errors?.location?.message}>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="location"
                    {...register("location", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label={"Maximum capacity"}
                error={errors?.maxCapacity?.message}
            >
                {/* <Label htmlFor="maxCapacity">Maximum capacity</Label> */}
                <Input
                    disabled={isWorking}
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    disabled={isWorking}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Facilities" error={errors?.facilities?.message}>
                <FormGroup
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2,1fr)",
                    }}
                >
                    {facilities.map((facility) => {
                        return (
                            <FormControlLabel
                                key={facility.id}
                                control={
                                    <Checkbox
                                        defaultChecked={checkedFacilities.includes(
                                            facility.id
                                        )}
                                    />
                                }
                                label={<FacilityItem>{facility.label}</FacilityItem>}
                                value={facility.id}
                                name={`facilities`}
                                {...register("facilities", {
                                    validate: atLeastOne,
                                })}
                            />
                        );
                    })}
                </FormGroup>
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) => {
                            return (
                                Number(value) <=
                                    Number(getValues().regularPrice) ||
                                "Can't be bigger than the regular price"
                            );
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label={"Cabin photos"}>
                <FileInput>
                    <input
                        type="file"
                        name=""
                        id="image"
                        accept="image/*"
                        multiple
                        {...register("image", {
                            required: isEditSession
                                ? false
                                : "This field is required",
                            onChange: handleFileChange,
                        })}
                    />
                </FileInput>
            </FormRow>

            {previewFiles.length > 0 && (
                <ImagesContainer>
                    {previewFiles.map((file, i) => {
                        return (
                            <ImageItem key={i}>
                                <RemoveImg
                                    onClick={() => {
                                        setPreviewFiles((prev) => {
                                            return prev.filter(
                                                (p) => p.name !== file.name
                                            );
                                        });
                                    }}
                                >
                                    <HiX />
                                </RemoveImg>
                                <ImgContainer>
                                    <img src={file.image || file.url} alt="" />
                                </ImgContainer>
                            </ImageItem>
                        );
                    })}
                </ImagesContainer>
            )}

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => {
                        onCloseModal?.();
                    }}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit cabin" : "Add cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
