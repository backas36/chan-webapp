import { nanoid } from "@reduxjs/toolkit"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./config"

const uploadFile = (file, filePath) => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, filePath)
    try {
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      resolve(url)
    } catch (error) {
      reject(error)
    }
  })
}

export const uploadUserPhoto = async (file, userId) => {
  const imageName = nanoid() + "." + file?.name?.split(".")?.pop()
  const photoUrlFromFirebase = await uploadFile(
    file,
    `profile/${userId}/${imageName}`
  )
  return photoUrlFromFirebase
}
