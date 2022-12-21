export const formateData = (processData) => {
  return {
    id: processData.id,
    name: processData.name,
    photoUrl: processData.photoUrl,
    email: processData.email,
    role: processData.role,
    status: processData.status,
    birthDate: processData.birthDate,
    mobile: processData.mobile,
    lineId: processData.lineId,
    address: processData.address,
  }
}
