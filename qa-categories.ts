export const qaCategories = [
  { label: 'Загальні питання', value: 'general' },
  { label: 'Технічна підтримка', value: 'technical' },
  { label: 'Безпека', value: 'security' },
  { label: 'Фінанси', value: 'finance' },
  { label: 'Обліковий запис', value: 'account' },
  { label: 'Інтеграції', value: 'integrations' },
  { label: 'API', value: 'api' },
  { label: 'Інше', value: 'other' },
] as const;

export type QACategory = typeof qaCategories[number]['value']; 