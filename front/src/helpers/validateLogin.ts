import { ILogin } from "./types/loginType";

export const validacionesLogin: (valores: ILogin)=>Partial<ILogin> = (valores) => {
    const errors: Partial<ILogin> = {};
    if (!valores.email.trim()) {
        errors.email = "El email es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
        errors.email = "Email no valido";
    }
    if (!valores.password.trim()) {
        errors.password = "La contrasena es obligatoria";
    } else if (valores.password.length < 6) {
        errors.password = "La contrasena debe ser al menos de 6 caracteres";
    }else if (valores.password.length > 20) {
        errors.password = "La contrasena debe ser maximo de 20 caracteres";
    }
    return errors;
};