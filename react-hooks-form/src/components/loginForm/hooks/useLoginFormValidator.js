import { useState } from "react";

import {
    nameValidator,
    emailValidator,
    messageBoxValidator,
  } from "../validators.js";


const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
      acc[field] = {
        ...fieldError,
        dirty: true,
      };
      return acc;
    }, {});
  };

export const useLoginFormValidator = form => {
    const [errors, setErrors] = useState({
        name: {
            dirty:"false",
            error:"false",
            message:"",
        },
        email: {
            dirty:"false",
            error:"false",
            message:"",
        },
        messageBox: {
            dirty:"false",
            error:"false",
            message:"",
        },
            
    });

    const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
        let isValid = true;


        const nextErrors = JSON.parse(JSON.stringify(errors));
        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
          }
        

        const { name, email, messageBox } = form;

        if (nextErrors.name.dirty && (field ? field === "name" : true)) {
            const nameMessage = nameValidator(name, form);
            nextErrors.name.error = !!nameMessage;
            nextErrors.name.message = nameMessage;
            if (!!nameMessage) isValid = false;
        }
          
          
        if (nextErrors.email.dirty && (field ? field === "email" : true)) {
            const emailMessage = emailValidator(email, form);
            nextErrors.email.error = !!emailMessage;
            nextErrors.email.message = emailMessage;
            if (!!emailMessage) isValid = false; 
        }
        
        
        if (nextErrors.messageBox.dirty && (field ? field === "messageBox" : true)) {
            const messageBoxMessage = messageBoxValidator(messageBox, form);
            nextErrors.messageBox.error = !!messageBoxMessage;
            nextErrors.messageBox.message = messageBoxMessage;
            if (!!messageBoxMessage) isValid = false;
        }


        setErrors(nextErrors);

        return {
          isValid,
          errors: nextErrors,
        };
      };

      const onBlurField = e => {
        const field = e.target.name;
        const fieldError = errors[field];
        if (fieldError.dirty) return;
    
        const updatedErrors = {
          ...errors,
          [field]: {
            ...errors[field],
            dirty: true,
          },
        };
    
        validateForm({ form, field, errors: updatedErrors });
      };
    
      return {
        validateForm,
        onBlurField,
        errors,
      };
    };

     
