import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando carga masiva de Centros de Donación...');

  const data = [
    { id: "DC-001", name: "Banco Municipal de Sangre", state: "Distrito Capital", city: "Caracas", address: "Avenida Norte 1, Esquina Pirineos, diagonal Hospital Vargas Caracas, 1010", phone: null, hours: "Martes a partir de las 07:00 AM - 12:00 PM", source: "Banco Municipal de Sangre", url: "https://www.instagram.com/p/DaHcundMzVV/", lat: 10.5133, lng: -66.9119, is_verified: true },
    { id: "DC-004", name: "Banco de Sangre Paraíso", state: "Distrito Capital", city: "Caracas", address: "Av. Washington con Puente 9 de Diciembre, Conj. Res. El Paraíso, 2da Etapa, Local 25B, Caracas", phone: "+58 412 617 4281", hours: "L-V 07:30-16:30", source: "Banco de Sangre Paraíso", url: "https://www.instagram.com/p/DaEszd5sk32/", lat: 10.4851, lng: -66.9360, is_verified: true },
    { id: "DC-005", name: "Clínica Atías - Banco de Sangre", state: "Distrito Capital", city: "Caracas", address: "Avenida Roosevelt, entre la Avenida El Cortijo y el Paseo, Urbanización Los Rosales, Caracas", phone: null, hours: "Lunes a viernes, 8:00 AM - 12:00 M", source: "Instagram oficial de Clínica Atías", url: "https://www.instagram.com/p/DaHWsAtNu47/", lat: 10.4880, lng: -66.9030, is_verified: true },
    { id: "MI-005", name: "Hospital Eugenio P. Bellard", state: "Miranda", city: "Guatire", address: "C. El Rosario, Guatire 1221", phone: "+584142381939", hours: "07:00 AM - 06:00 PM", source: "Infografía compartida", url: null, lat: 10.4770, lng: -66.5360, is_verified: false },
    { id: "CB-002", name: "Servicio de Hemoterapia - Hospital Central Dr. Enrique Tejera", state: "Carabobo", city: "Valencia", address: "Av. Lisandro Alvarado", phone: null, hours: "No especificado", source: "Hospital Central Dr. Enrique Tejera", url: null, lat: 10.1700, lng: -68.0000, is_verified: false },
    { id: "AR-001", name: "Centro Médico Maracay", state: "Aragua", city: "Maracay", address: "Av. Las Delicias Edificio Centro Médico, local 1, Urbanización El Bosque, Maracay", phone: "+582432003700", hours: "Lun - Vie 7:00 am - 7:00 pm / Sáb - Dom 7:00 am - 12:00 pm", source: "Página oficial del Centro Médico Maracay", url: "https://www.centromedicomaracay.com/banco-de-sangre/", lat: 10.2647, lng: -67.5912, is_verified: true },
    { id: "LR-001", name: 'Banco de Sangre "Dr. J. J. Boada" - Hospital Central Universitario Antonio María Pineda', state: "Lara", city: "Barquisimeto", address: "Av. Vargas, Barquisimeto, Venezuela, 3001", phone: "+582512524845", hours: "No especificado", source: "Facebook oficial Hospital Central Universitario Antonio María Pineda", url: "https://www.facebook.com/hcuamp", lat: 10.0718, lng: -69.3242, is_verified: true },
    { id: "FC-001", name: "Banco de Sangre Dr. Edmundo Piña - Hospital Universitario Dr. Alfredo Van Grieken", state: "Falcón", city: "Coro", address: "Av. El Tenis con Av. Santa Rosa, Coro", phone: "+58 268 2516433", hours: "No especificado", source: "Hospital Universitario Dr. Alfredo Van Grieken", url: null, lat: 11.4111, lng: -69.6700, is_verified: true },
    { id: "ME-001", name: "Banco de Sangre - IAHULA", state: "Mérida", city: "Mérida", address: "Av. 16 de Septiembre, Mérida, Venezuela, 5101", phone: null, hours: "No especificado", source: "IAHULA", url: null, lat: 8.5833, lng: -71.1667, is_verified: false },
    { id: "ZU-001", name: "Banco de Sangre Unidad Central Maracaibo", state: "Zulia", city: "Maracaibo", address: "Al lado de la Maternidad Castillo Plaza, frente a la Facultad de Medicina de LUZ", phone: "+582617517866", hours: "Desde 7:30", source: "Facultad de Medicina de LUZ", url: "https://www.instagram.com/p/DaG2ED3REng/", lat: 10.6698, lng: -71.6245, is_verified: true },
  ];

  for (const item of data) {
    await prisma.donationCenter.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        capacity_per_day: 50, // Campo obligatorio que definiste en el schema
        updated_at: new Date(),
      },
    });
  }

  console.log('✅ Base de datos poblada exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });