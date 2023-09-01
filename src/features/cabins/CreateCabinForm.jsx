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

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const isWorking = isEditing || isCreating;

    const { user } = useUser();
    const userId = user.id


    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession) {
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: () => {
                        onCloseModal?.();
                        reset();
                    },
                }
            );
        } else {
            createCabin(
                { ...data, image: image, userId },
                {
                    onSuccess: () => {
                        onCloseModal?.();
                        reset();
                    },
                }
            );
        }
    }

    // function onError(errors) {}

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
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

            <FormRow label={"Cabin photo"}>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

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
