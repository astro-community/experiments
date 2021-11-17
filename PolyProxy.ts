import Poly from './Poly.astro'
import { toHyphen } from './internal/toHyphen.ts'

export default new Proxy(Poly, {
	get(component, name) {
		if (name in component || name === 'then') return component[name]

		return Object.assign(
			async (result: any, props: any, slots: any) => await component(
				result,
				{
					as: toHyphen(name),
					...props,
				},
				slots
			),
			{
				isAstroComponentFactory: true,
			}
		)
	},
})