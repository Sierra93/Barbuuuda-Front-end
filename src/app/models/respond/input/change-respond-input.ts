/**
 * Класс изменения ставки исполнителя.
 */
 export class ChangeRespondInput {
    // Id задания.
    TaskId: number = 0;

    // Id ставки.
    RespondId: number = 0;

    // Цена, за которую исполнитель готов выполнить задание.
    Price: number = 0;

    // Комментарий.
    Comment: string = "";
}