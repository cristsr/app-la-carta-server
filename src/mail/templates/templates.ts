function format(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

export function userCreatedSuccessfully(args: any): string {
  const mail = `
    <div>
      <h1>Bienvenido a applacarta</h1>
      <p>Su usuario ha sido creado exitosamente, sus credenciales de acceso son las siguientes:</p>
      <ul>
        <li>usuario: ${args.email}</li>
        <li>Contraseña: ${args.password}</li>
      </ul>
      <p>Para inicir sesion, ingresar a <a href="http://dev.applacarta.com/">applacarta</a> y cambie su contraseña</p>
    <div>
  `;

  return format(mail);
}

export function passwordRecovery(args: any): string {
  const mail = `
    <div>
      <h1>Recuperación de contraseña.</h1>
      <p>El procedimiento para recuperar su contraseña fue inciado. Si no lo hizo usted, ignore este correo electrónico.</p>
      <p>Use este link para cambiar su contraseña</p> 
      <a href="http://dev.applacarta.com/recovery-password?recoveryToken=${args.recoveryToken}">Cambiar contraseña</a>
    <div>
  `;

  return format(mail);
}
