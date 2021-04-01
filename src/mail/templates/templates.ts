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
