import { gapi, loadAuth2 } from 'gapi-script';

export const uploadFileDirectly = async (file: File) => {
  const accessToken = gapi.auth.getToken().access_token; // Получаем токен из gapi

  const metadata = {
    name: file.name,
    mimeType: file.type,
    // parents: ['id_папки'] // Опционально: ID папки на диске
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  try {
    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id, webViewLink',
      {
        method: 'POST',
        headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
        body: form,
      },
    );
    const result = await response.json();
    console.log('Файл загружен. ID:', result.id);
    console.log('Ссылка для просмотра:', result.webViewLink); // или result.webContentLink для прямой ссылки на файл
    // Отправляем ссылку на бэкенд
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  }
};

// Где-то в начале, например, в useEffect или при загрузке страницы
export const auth2 = await loadAuth2(
  gapi, // или просто gapi, если он глобально загружен
  'ТВОЙ_CLIENT_ID.apps.googleusercontent.com',
  'https://www.googleapis.com/auth/drive.file', // или 'https://www.googleapis.com/auth/drive.readonly' если только просмотр
);

// Теперь у тебя есть объект auth2. Он нужен, чтобы войти:
const isSignedIn = auth2.isSignedIn.get(); // true/false
if (!isSignedIn) {
  auth2.signIn(); // Показывает окно входа
}

// А когда пользователь вошел, ты можешь получить токен:
const currentUser = auth2.currentUser.get();
const authResponse = currentUser.getAuthResponse();
const accessToken = authResponse.access_token; // Вот этот токен ты передаешь в Picker
