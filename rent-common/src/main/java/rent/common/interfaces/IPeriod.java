package rent.common.interfaces;

import java.time.LocalDate;

/**
 * Интерфейс для сущьностей у которых должен указываться период действия С - период действия ПО
 */
public interface IPeriod {
    LocalDate getDateStart();

    LocalDate getDateEnd();
}
