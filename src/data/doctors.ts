import { Doctor } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 12,
    bio: `Dr. Johnson specializes in cardiovascular health with a focus on preventative care and women's heart health`,
    availability: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    image: 'https://images.pexels.com/photos/5439467/pexels-photo-5439467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 8,
    bio: 'Dr. Chen is a board-certified neurologist with expertise in headache disorders and neurodegenerative diseases.',
    availability: ['Tuesday', 'Thursday', 'Saturday']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 15,
    bio: 'Dr. Rodriguez has been caring for children for over 15 years with a special interest in developmental health.',
    availability: ['Monday', 'Tuesday', 'Thursday']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Dermatology',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 10,
    bio: 'Dr. Wilson focuses on treating skin conditions and performing minimally invasive cosmetic procedures.',
    availability: ['Wednesday', 'Friday', 'Saturday']
  },
  {
    id: '5',
    name: 'Dr. Olivia Kim',
    specialty: 'Internal Medicine',
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    experience: 12,
    bio: 'Dr. Kim provides comprehensive care for adults with an emphasis on chronic disease management.',
    availability: ['Monday', 'Wednesday', 'Friday']
  }
];