import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGoalsTable1698535908774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'goals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'target',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'deadline',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'progress',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('goals', true);
  }
}