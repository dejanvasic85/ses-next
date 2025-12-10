import {defineType} from 'sanity'

export default defineType({
  type: 'document',
  name: 'teamMember',
  title: 'Team member',
  fields: [
    {name: 'name', type: 'string', title: 'Full name'},
    {name: 'role', type: 'string', title: 'Role'},
    {name: 'avatar', type: 'image', title: 'Avatar'},
  ],
})
