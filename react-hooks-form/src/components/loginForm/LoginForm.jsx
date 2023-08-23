import { useState } from "react";
import clsx from "clsx";
import styles from "./LoginForm.module.css";
import {useLoginFormValidator} from "./hooks/useLoginFormValidator";




const LoginForm = props => {
    const[form, setForm] = useState({
        name : '',
        email: '',
        messageBox: '',


    });

    const { errors, validateForm, onBlurField } = useLoginFormValidator(form);


    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
        if(errors[field].dirty)
            validateForm({
                form: nextFormState,
                errors,
                field,
        
            });
    };

    const onSubmitForm = e =>{
        e.preventDefault();
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return; 
        alert(JSON.stringify(form, null, 2));
    };

return(
    <form className={styles.form} onSubmit={onSubmitForm}>
        <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name</label>
            <input
            className={clsx(
                styles.formFiled, 
                errors.name.dirty && errors.name.error && styles.formFieldError
            )}
            type='text'
            aria-label="name field"
            name="name"
            value={form.name}
            onChange={onUpdateField}
            onBlur={onBlurField}
            />
            {errors.name.dirty && errors.name.error ? (
                <p className={styles.formFieldErrorMessage}>{errors.name.message}</p>
            ) : null}

        </div> 

        <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
            className={clsx(
                styles.formField, 
                errors.email.dirty && errors.email.error && styles.formFieldError
            )}
                
            type='text'
            aria-label="email field"
            name="email"
            value={form.email}
            onChange={onUpdateField}
            onBlur={onBlurField}
            />
            {errors.email.dirty && errors.email.error ? (
                <p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
            ) : null}
        </div>

        <div className={styles.formGroup}>
            <label className={styles.formLabel}>Message</label>
            <input
            className={clsx(
                styles.formField,
                errors.messageBox.dirty && errors.messageBox.error && styles.formFieldError
                
                )}
            type="text"
            aria-label='messageBox field'
            name="messageBox"
            value={form.messageBox}
            onChange={onUpdateField}
            onBlur={onBlurField}
            />
             {errors.messageBox.dirty && errors.messageBox.error ? (
                <p className={styles.formFieldErrorMessage}>{errors.messageBox.message}</p>
            ) : null}
        </div>
        <div className={styles.formActions}>
            <button className={styles.formSubmitBtn} type="submit">Submit</button>
    
        </div>
    </form>
    );
};

export default LoginForm;