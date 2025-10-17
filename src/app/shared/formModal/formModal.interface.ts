export interface InputsFormModal {
  title: string;
  text?: string;
  inputsConfig: InputsConfig[];
  error?: string;
  textButtonConfirm: string;
  context: 'USER' | 'ORDERGERENT-ADDARTICLE' | 'ORDERGERENTADMIN-CREATE-EDIT';
  clearFieldKey?: string;
}

interface InputsConfig {
  name: string;
  key: string;
  obligatory: boolean;
  inputType: 'text' | 'list' | 'email' | 'password' | 'number';
  error?: string | PasswordConditions;
  article: string;
  options?: string[];
  dependsOn?: DependsOn;
}

export interface PasswordConditions {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  symbol: boolean;
}

interface DependsOn {
  key: string;
  value: string;
}
