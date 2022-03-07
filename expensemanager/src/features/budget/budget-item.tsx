import { Card } from '@features/ui'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { numberToCurrency, timestampToDate } from '../../utils'
import { Expense } from '../../types/index.d'
import { colors } from '../../theme/colors'

// types
interface Props extends Expense {
  onLongPress: (expense: Expense) => void
}

const imagesByCategory: Record<string, any> = {
  food: require('../../assets/icono_comida.png'),
  health: require('../../assets/icono_salud.png'),
  home: require('../../assets/icono_casa.png'),
  leisure: require('../../assets/icono_ocio.png'),
  others: require('../../assets/icono_comida.png'),
  subscriptions: require('../../assets/icono_suscripciones.png'),
  transport: require('../../assets/icono_comida.png')
}

const categories: Record<string, string> = {
  food: 'Comida',
  transport: 'Transporte',
  leisure: 'Ocio',
  home: 'Casa',
  health: 'Salud',
  others: 'Otros'
}

export function BudgetItem({
  amount,
  category,
  name,
  createdAt,
  id,
  onLongPress
}: Props) {
  const expense: Expense = { amount, category, name, createdAt, id }
  return (
    <Pressable onLongPress={() => onLongPress(expense)}>
      <Card>
        <View style={styles.content}>
          <View style={styles.pane}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                width={50}
                height={50}
                source={imagesByCategory[category]}
              />
            </View>

            <View style={styles.details}>
              <Text style={styles.category}>{categories[category]}</Text>
              <Text style={styles.name}>{name}</Text>
              <Text>{timestampToDate(createdAt)}</Text>
            </View>
          </View>

          <View style={styles.pane}>
            <Text>{numberToCurrency(amount)}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {},
  imageContainer: {
    marginRight: 12
  },
  category: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.stone[400],
    textTransform: 'uppercase'
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.stone[700]
  },
  image: {
    width: '100%',
    height: '100%'
  },
  pane: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
