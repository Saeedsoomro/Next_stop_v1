import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

const ImageComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    })
      .then((response) => {
        const source = { uri: response.path };
        setSelectedImage(source);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  return (
    <View>
      <Button title="Select Image" onPress={selectImage} />
      {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

export default ImageComponent;
