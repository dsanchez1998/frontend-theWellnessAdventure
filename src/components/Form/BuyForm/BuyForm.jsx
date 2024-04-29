import React from "react";
import { useForm } from "react-hook-form";
import plansData from "../../../data/plansData.js";
import "./BuyForm.css";

const BuyForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      salud: "alergia",
      sugerencias: "Quiero instructor personalizado",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const validatePlan = (value) => {
    if (value === "default") {
      return "Por favor, seleccione un plan diferente al predeterminado.";
    }
    return true;
  };
  return (
    <div className="buy-form-container">
      <div className="buy-form-title">
        <h2>Comprar Plan</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="buy-form">
        <div className="buy-inputs">
          <div className="buy-input">
            <label className="buy-label">
              Elige un plan de retiro de bienestar
            </label>
            <select
              {...register("planRetiro", {
                required: true,
                validate: validatePlan,
              })}
              onChange={(event) => console.log(event.target.value)}
            >
              <option value="default">Seleccionar plan</option>
              {plansData.map((plan) => (
                <option key={plan.value} value={plan.value}>
                  {plan.label}
                </option>
              ))}
            </select>
            {errors.planRetiro && <p>{errors.planRetiro.message}</p>}
          </div>
          <div className="buy-input">
            <label className="buy-label">Información de salud</label>
            <input
              type="text"
              {...register("salud", { maxLength: 1000, required: true })}
              placeholder="Ingrese su informacion de medica de salud actual"
            />
            {errors.salud?.type === "required" && (
              <p className="parrafo-error">
                El campo de informacion de salud es requerido
              </p>
            )}
            {errors.salud?.type === "maxLength" && (
              <p className="parrafo-error">
                El campo de informacion de salud debe de tener menos de 1000
                caracteres
              </p>
            )}
          </div>
          <div className="buy-input">
            <label className="buy-label">Sugerencias</label>
            <input
              type="text"
              {...register("sugerencias", {
                maxLength: 1000,
                required: true,
              })}
              placeholder="Ingrese su sugerencias personales"
              required
            />
            {errors.sugerencias?.type === "required" && (
              <p className="parrafo-error">
                El campo de sugerencias personales es requerido
              </p>
            )}
            {errors.sugerencias?.type === "maxLength" && (
              <p className="parrafo-error">
                El campo de sugerencias personales debe de tener menos de 1000
                caracteres
              </p>
            )}
          </div>
        </div>
        <div className="terms-checkbox">
          <input type="checkbox" id="terms" name="termsAccepted" required />
          <label htmlFor="terms">Acepto los términos y condiciones</label>
          <a href="/terms-and-conditions" target="_blank">
            Leer términos y condiciones
          </a>
        </div>
        <input type="submit" value="continuar" />
      </form>
    </div>
  );
};

export default BuyForm;
