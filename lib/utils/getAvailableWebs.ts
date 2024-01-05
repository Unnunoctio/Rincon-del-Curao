import { InfoModel } from '../models'

export const getAvailableWebs = async (availableWebs: string[]): Promise<String[]> => {
  const webs = await InfoModel.find().select('_id').exec()
  const webIds = webs.map(w => w._id)

  if (availableWebs.length === 0) return webIds
  return webIds.filter(w => availableWebs.includes(w.toString()))
}
