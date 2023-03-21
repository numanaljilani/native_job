import React from 'react'
import { TouchableOpacity , Image } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({ iconUrl , dimension , handlePress}) => {

  return (
    <TouchableOpacity className = {` w-full`} style={ styles.btnContainer}>
      <Image source={iconUrl} resizeMode='cover' style={ styles.btnImg(dimension)} onPress={() => handlePress() }/>
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn