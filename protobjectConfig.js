// src/protobjectConfig.js
export function setupProtobject() {
  window.Protobject.setProduction(true);
  window.Protobject.initialize([
    {
      name: "Servo",
      page: "/arduino",
    },
    {
      name: "Knob",
      page: "/control",
      main: true,
    },
  ]);
}
