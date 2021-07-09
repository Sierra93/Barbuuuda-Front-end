// Класс описывает структуру задания.
export class TaskStructure {
    // Id заказчика, который создал задание.
    public taskId: number = 0;

    // Id заказчика, который создал задание.
    public ownerId: string = "";

    // Id исполнителя, который выполняет задание.
    public executorId: string = "";

    // Дата завершения задачи.
    public taskBegda: string = "";

    // Кол-во ставок к заданию.
    public countOffers: number = 0;

    // Кол-во просмотров задания.
    public countViews: number = 0;

    // Код типа заданий (для всех, для про).
    public typeCode: string = "";

    // Код статуса задания.
    public statusCode: string = "";

    // Код категории задания (программирование и тд).
    public categoryCode: string = "";

    // Бюджет задания в цифрах либо по дефолту "По договоренности".
    public taskPrice: number | null = 0;

    // Заголовок задания.
    public taskTitle: string = "";

    // Описание задания.
    public taskDetail: string = "";

    // Код специализации.  
    public specCode: string = "";

    // Флаг оплаты задания заказчиком.
    public isPay: boolean = false;

    // Флаг подтверждения исполнителем взятия в работу задания.
    public isWorkAccept: boolean = false;
}