import { List, ListItem, Text, UnorderedList } from '@chakra-ui/react'

interface Props<Type> {
	data: Type | undefined
	exclude: string[]
}

export const ItemDetails = <Type extends { id: number }>({
	data,
	exclude,
}: Props<Type>) => {
	return (
		<List>
			{Object.entries(data ?? {})
				.filter((item) => ![...exclude, 'id'].includes(item[0]))
				.map((item, idx) => (
					<ListItem m='10px 0' key={idx}><Text display='inline' fontWeight={700}>{item[0]}:</Text> {item[1]}</ListItem>
				))}
		</List>
	)
}
