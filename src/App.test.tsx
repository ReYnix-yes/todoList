// App.test.tsx
import { render } from '@testing-library/react';
import { App, add } from './App.tsx';

test('addition works correctly', () => {
    render(<App/>);
    expect(add(1, 2)).toBe(3); // Проверяем, что результат равен ожидаемому значению
});
