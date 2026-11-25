import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles';

export default function SonoraHud() {
  return (
    <View pointerEvents="box-none" style={styles.hudLayer}>
      {/*
        SONORA HUD — PONTO DE PERSONALIZAÇÃO
        Adicione aqui seus elementos animados: waveform, equalizador,
        coordenadas, indicadores, progress bar ou overlays.
        O layer ocupa toda a arte hero e fica acima dos elementos visuais.
        Use pointerEvents="none" nos elementos decorativos para não bloquear
        os botões que ficam na parte inferior da hero.
      */}
    </View>
  );
}
