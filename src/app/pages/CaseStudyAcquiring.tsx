import React from 'react';
import styles from './CaseStudyAcquiring.module.scss';
import { HeroSection } from '../../shared/ui/organisms/HeroSection/HeroSection';
import { ProblemSection } from '../../shared/ui/organisms/ProblemSection/ProblemSection';
import { GoalsSection } from '../../shared/ui/organisms/GoalsSection/GoalsSection';
import { ContextSection } from '../../shared/ui/organisms/ContextSection/ContextSection';
import { PersonaSection } from '../../shared/ui/organisms/PersonaSection/PersonaSection';
import { FeatureSection } from '../../shared/ui/organisms/FeatureSection/FeatureSection';
import { DecisionSection } from '../../shared/ui/organisms/DecisionSection/DecisionSection';
import { RetrospectiveSection } from '../../shared/ui/organisms/RetrospectiveSection/RetrospectiveSection';
import { ResultsSection } from '../../shared/ui/organisms/ResultsSection/ResultsSection';
import { ReflectionSection } from '../../shared/ui/organisms/ReflectionSection/ReflectionSection';

/**
 * CaseStudyAcquiring
 * 
 * Complete case study page: "Система обработки заявок на эквайринг"
 * (B2B Acquiring Request Processing Platform)
 */
const CaseStudyAcquiring: React.FC = () => {
  return (
    <main className={styles.caseStudyPage}>
      <div className={styles.pageContainer}>
        {/* 1. Hero Section */}
        <section className={styles.section}>
          <HeroSection
            titleProps={{
              size: 'M',
              children: 'Система обработки заявок на эквайринг',
            }}
            image={
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#f0f0f0',
                borderRadius: 'var(--radius-16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                Hero Image
              </div>
            }
            rows={[
              {
                label: 'Тип продукта',
                value: 'B2B-платформа для обработки заявок на эквайринг',
              },
              {
                label: 'Моя роль',
                value: 'Единственный дизайнер продукта',
              },
              {
                label: 'Зона ответственности',
                value: 'От исследования процессов до развития платформы после запуска MVP',
              },
              {
                label: 'Команда',
                value: 'BO, аналитики, разработчики, QA',
              },
            ]}
          />
        </section>

        {/* 2. Problem Section */}
        <section className={styles.section}>
          <ProblemSection
            titleProps={{
              size: 'M',
              children: 'Проблема',
            }}
            paragraph={
              <div>
                <p><strong>Обработка заявок занимала до 18 дней</strong></p>
                <p>
                  Заявка проходила через несколько подразделений и систем. Сотрудники вручную 
                  переносили данные между инструментами, уточняли информацию через почту и тратили 
                  время на поиск актуальных статусов.
                </p>
                <p>
                  В результате процесс подключения эквайринга занимал недели, а часть клиентов 
                  уходила к конкурентам.
                </p>
              </div>
            }
            cite={{
              text: 'Мы подали заявку, но не понимали, что происходит дальше. Через несколько дней решили подключить эквайринг в другом банке.',
              source: 'Предприниматель',
            }}
            cards={[
              {
                variant: 'insight',
                title: 'Работа в 5 системах',
                description: 'Данные приходилось переносить вручную',
              },
              {
                variant: 'insight',
                title: 'Коммуникация через почту',
                description: 'Согласования занимали дни',
              },
              {
                variant: 'insight',
                title: 'Нет данных по остаткам оборудования',
                description: 'Менеджеры уточняли информацию вручную',
              },
            ]}
          />
        </section>

        {/* 3. Goals Section */}
        <section className={styles.section}>
          <GoalsSection
            titleProps={{
              size: 'M',
              children: 'Почему проект стал приоритетом',
            }}
            cards={[
              {
                variant: 'number',
                title: '18 дней подключение эквайринга',
                number: '1',
              },
              {
                variant: 'number',
                title: '5 систем использовали сотрудники',
                number: '2',
              },
              {
                variant: 'number',
                title: '3 подразделения участвовали в процессе',
                number: '3',
              },
              {
                variant: 'number',
                title: 'Почта основной канал коммуникации',
                number: '4',
              },
            ]}
          />
        </section>

        {/* 4. Context Section - Role analysis with pie chart */}
        <section className={styles.section}>
          <ContextSection
            titleProps={{
              size: 'M',
              children: 'Начали с роли, которая давала максимальный эффект для бизнеса',
              as: 'h2',
            }}
            image={
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#eaecee',
                borderRadius: 'var(--radius-20)',
              }}>
                Pie Chart
              </div>
            }
            rows={[]}
            card={{
              variant: 'risk',
              title: 'Не пытались автоматизировать всё сразу',
              description: 'Вместо проектирования системы для всех подразделений одновременно сначала сфокусировались на роли, которая давала максимальный эффект для бизнеса.',
            }}
          />
        </section>

        {/* 5. Persona Section - Interview findings (HORIZONTAL) */}
        <section className={styles.section}>
          <PersonaSection
            titleProps={{
              size: 'M',
              children: 'Что показали интервью',
              as: 'h2',
            }}
            personas={[
              {
                icon: null,
                tagText: 'Workflow',
                title: 'Переключение между системами',
                description: 'Для выполнения одной задачи сотрудники переносили данные между несколькими инструментами и постоянно теряли контекст работы.',
              },
              {
                icon: null,
                tagText: 'DataAnalysis',
                title: 'Отсутствие единой информации',
                description: 'Сотрудники не могли быстро найти актуальный статус заявки или информацию по оборудованию.',
              },
            ]}
          />
        </section>

        {/* 6. Feature Section */}
        <section className={styles.section}>
          <FeatureSection
            titleProps={{
              size: 'M',
              children: 'Ключевые фичи первой версии',
              as: 'h2',
            }}
            image={
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#f0f0f0',
                borderRadius: 'var(--radius-16)',
              }}>
                Feature
              </div>
            }
            metrics={[
              {
                type: 'short',
                title: 'Снизили время обработки',
                description: 'С 18 дней до 5 дней',
              },
              {
                type: 'short',
                title: 'Упростили процесс',
                description: 'Единое место для всей информации',
              },
              {
                type: 'short',
                title: 'Улучшили видимость',
                description: 'Клиенты видят статус заявки в реальном времени',
              },
              {
                type: 'short',
                title: 'Автоматизировали',
                description: 'Уменьшили ручные операции на 70%',
              },
            ]}
          />
        </section>

        {/* 7. Decision Section */}
        <section className={styles.section}>
          <DecisionSection
            titleProps={{
              size: 'L',
              children: 'Решения проверялись на пользователях до разработки',
              as: 'h2',
            }}
            quotes={[
              {
                leftName: 'Раньше',
                leftQuote: 'Изменения сразу попадали в разработку',
                rightName: 'Теперь',
                rightQuote: 'Быстрые проверки на сотрудниках перед разработкой',
              },
            ]}
          />
        </section>

        {/* 8. Persona Section - Roles (HORIZONTAL) */}
        <section className={styles.section}>
          <PersonaSection
            titleProps={{
              size: 'M',
              children: 'Адаптация под разные роли',
              as: 'h2',
            }}
            personas={[
              {
                icon: null,
                tagText: 'Manager',
                title: 'Менеджеры',
                description: 'Версия 1.0: Проверка заявок, подбор оборудования, сопровождение клиента, контроль прохождения заявки',
              },
              {
                icon: null,
                tagText: 'Security',
                title: 'Служба безопасности',
                description: 'Версия 2.0: Проверка юридических данных клиента и принятие решения по согласованию заявки',
              },
              {
                icon: null,
                tagText: 'Engineer',
                title: 'Инженеры',
                description: 'Версия 2.0: Установка оборудования, сопровождение торговых точек и управление парком терминалов',
              },
            ]}
          />
        </section>

        {/* 9. Context Section - Platform architecture */}
        <section className={styles.section}>
          <ContextSection
            titleProps={{
              size: 'M',
              children: 'Как устроена платформа',
              as: 'h2',
            }}
            image={
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#f0f0f0',
                borderRadius: 'var(--radius-20)',
              }}>
                Architecture
              </div>
            }
            rows={[
              {
                title: 'Управление заявками',
                description: 'Единый процесс для всех подразделений с автоматическими уведомлениями',
              },
              {
                title: 'Аналитика',
                description: 'Дашборды для отслеживания метрик и узких мест',
              },
              {
                title: 'Интеграции',
                description: 'Синхронизация с существующими системами банка',
              },
            ]}
          />
        </section>

        {/* 10. Persona Section - Extended personas (HORIZONTAL) */}
        <section className={styles.section}>
          <PersonaSection
            titleProps={{
              size: 'M',
              children: 'Расширение: Новые подразделения',
              as: 'h2',
            }}
            personas={[
              {
                icon: null,
                tagText: 'v2.0',
                title: 'Первый сценарий',
                description: 'Описание первого сценария использования платформы',
              },
              {
                icon: null,
                tagText: 'v2.0',
                title: 'Второй сценарий',
                description: 'Описание второго сценария использования платформы',
              },
              {
                icon: null,
                tagText: 'v2.0',
                title: 'Третий сценарий',
                description: 'Описание третьего сценария использования платформы',
              },
            ]}
          />
        </section>

        {/* 11. Retrospective Section */}
        <section className={styles.section}>
          <RetrospectiveSection
            titleProps={{
              size: 'M',
              children: 'Что мы выучили',
              as: 'h2',
            }}
            cards={[
              {
                variant: 'insight',
                title: 'Начните с большей проблемы',
                description: 'Даже когда вся система нуждается в переделке, решение одной большой проблемы даёт видимый результат.',
              },
              {
                variant: 'insight',
                title: 'Пользователи - источник истины',
                description: 'Интервью раскрыли более глубокие проблемы, чем первоначальный анализ процесса.',
              },
              {
                variant: 'insight',
                title: 'Валидируйте рано',
                description: 'Проверка решений на реальных пользователях до разработки сэкономила месяцы работы.',
              },
            ]}
          />
        </section>

        {/* 12. Results Section */}
        <section className={styles.section}>
          <ResultsSection
            titleProps={{
              size: 'M',
              children: 'Результаты',
              as: 'h2',
            }}
            results={[
              {
                size: 'L',
                title: '5 дней',
                description: 'Среднее время обработки заявки (было 18)',
              },
              {
                size: 'L',
                title: '70%',
                description: 'Снижение ручных операций',
              },
              {
                size: 'L',
                title: '3 роли',
                description: 'Успешно интегрированы в одну платформу',
              },
              {
                size: 'L',
                title: '2.0',
                description: 'Вторая версия с расширенным функционалом запущена',
              },
              {
                size: 'L',
                title: '90%',
                description: 'Удовлетворённость пользователей (NPS)',
              },
            ]}
          />
        </section>

        {/* 13. Reflection Section */}
        <section className={styles.section}>
          <ReflectionSection
            header="Ключевые выводы"
            items={[
              'Подходите к большим проблемам пошагово, начиная с самой болезненной точки',
              'Глубокое понимание пользователя важнее красивого дизайна',
              'Валидация с реальными людьми раньше разработки экономит месяцы',
              'Успех B2B платформы измеряется улучшением процессов, а не количеством фич',
            ]}
          />
        </section>
      </div>
    </main>
  );
};

export default CaseStudyAcquiring;
