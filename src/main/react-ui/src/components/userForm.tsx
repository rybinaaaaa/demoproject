import {ChangeEvent, FC, FormEvent, useState} from "react";
import {IUserRequest} from "../interfaces";

interface UserFormProps {
    onSubmit: (user: IUserRequest) => void
}

interface FormValues {
    age: string,
    name: string
}

interface ErrorStatus {
    hasError: boolean,
    message?: string
}

interface FormErrors {
    age: ErrorStatus,
    name: ErrorStatus
}

const UserForm: FC<UserFormProps> = ({onSubmit}) => {
        const [formValues, setFormValues] = useState<FormValues>({
            age: "20",
            name: "Gerald"
        });

        const [errors, setErrors] = useState<FormErrors>({
            age: {hasError: false},
            name: {hasError: false},
        })

        const hasErrors = (): boolean => Object.values(errors).some(error => error.hasError);

        const validate = (value: string, isValid: (value: string) => boolean, errorMessage: string): ErrorStatus => {
            return isValid(value)
                ? {hasError: false}
                : {hasError: true, message: errorMessage};
        };

        const validateForm = (): FormErrors => {
            const nameError = validate(
                formValues.name,
                value => value.trim().length > 0,
                "Name cannot be empty");
            const ageError = validate(
                formValues.age,
                value => +value > 0,
                "Age must be a positive number");

            return {name: nameError, age: ageError};
        };

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setFormValues(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();

            const formErrors = validateForm();
            setErrors(formErrors);

            if (!hasErrors()) {
                onSubmit(formValues);
                return;
            }
            console.error("Invalid input data on submit");
        };

        const renderError = (field: ErrorStatus) => {
            return field.hasError && <div>{errors.name.message}</div>
    }

        return (
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="name">Enter your name</label>
                    <input id="name" type="text" name="name" value={formValues.name} onChange={handleChange}/>
                    {renderError(errors.name)}
                    <label htmlFor="age">Enter your age</label>
                    <input id="age" type="text" name="age" value={formValues.age} onChange={handleChange}/>
                    {renderError(errors.age)}
                </fieldset>
                <button type="submit">Send data!</button>
            </form>
        );
    }
;

export default UserForm;