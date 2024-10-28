import {ChangeEvent, FC, FormEvent, useState} from "react";
import {IUserRequest} from "../interfaces";

interface UserFormProps {
    onSubmit: (user: IUserRequest) => Promise<void>
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

        const namePattern = /^[A-Za-z]+$/;

        const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

        const [errors, setErrors] = useState<FormErrors>({
            age: {hasError: false},
            name: {hasError: false},
        })

        const hasErrors = (formValidationResult: FormErrors): boolean => Object.values(formValidationResult).some(error => error.hasError);

        const validate = (value: string, isValid: (value: string) => boolean, errorMessage: string): ErrorStatus => {
            return isValid(value)
                ? {hasError: false}
                : {hasError: true, message: errorMessage};
        };

        const validateForm = (): FormErrors => {
            const nameError = validate(
                formValues.name,
                value => namePattern.test(value),
                "Name cannot be empty and should contain only letters!");
            const ageError = validate(
                formValues.age,
                value => +value > 0,
                "Age must be a positive number");

            return {name: nameError, age: ageError};
        };

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setFormValues(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value.trim(),
            }));
        }

        const clearForm = () => {
            setFormValues({
                age: "",
                name: ""
            });
            setErrors(({
                age: {hasError: false},
                name: {hasError: false},
            }));
        }

        const onSuccessfulSubmit = () => {
            setShowSuccessAlert(true);
            clearForm();
            setTimeout(() => setShowSuccessAlert(false), 1000);
        }

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();

            const formErrors = validateForm();

            if (hasErrors(formErrors)) {
                console.error("Invalid input data on submit");
                setErrors(formErrors);
                return;
            }
            onSubmit(formValues)
                .then(onSuccessfulSubmit);
            clearForm();
        };

        const renderError = (field: ErrorStatus) => {
            return field.hasError && <div className="error-form-message">{field.message}</div>
        }

        return (
            <>
                <div className={`alert ${showSuccessAlert ? 'alert_active' : ''}`}>
                    Form has been successfully added
                </div>
                <form onSubmit={handleSubmit} className="user-form">
                    <legend>Add user</legend>
                    <fieldset>
                        <label htmlFor="name">Enter your name</label>
                        <input id="name" type="text" name="name" value={formValues.name} onChange={handleChange}/>
                        {renderError(errors.name)}
                        <label htmlFor="age">Enter your age</label>
                        <input id="age" type="text" name="age" value={formValues.age} onChange={handleChange}/>
                        {renderError(errors.age)}
                    </fieldset>
                    <button className="btn-primary" type="submit">Send data!</button>
                </form>
            </>
        );
    }
;

export default UserForm;