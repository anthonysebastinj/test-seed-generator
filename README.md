# 👾 test-seed-generator

Generate fake test data (JSON or SQL) using simple YAML schemas.
Ideal for testing, prototyping, and seeding databases with realistic mock data.

## 📦 Installation

To install the CLI tool globally via npm, run the following command in your terminal:

npm install -g test-seed-generator

### 🚀 Usage

Run the CLI by specifying:

The path to your schema file using the --config flag

The output directory where files should be generated using the --output flag

#### 👉 Example:

test-seed-generator --config ./schemas/user-schema.yaml --output ./seeds

##### 🛠️ Creating Your Schema

You need to create a YAML configuration file that defines the structure and content of your mock data.

Example schema.yaml:

users:
 count: 5
 fields:
  id: uuid
  name: name.fullName
  email: internet.email
  role: [admin, user, guest]

Explanation:

users: the name of the dataset/table

count: number of records to generate

fields: key-value pairs for field names and faker data types or options

###### 📁 Output

Based on the selected format (default is JSON), the CLI generates files in the specified output directory.

Examples:

JSON Output:
./seeds/users.json

SQL Output (if --format sql is used):
./seeds/users.sql

Each file contains the generated fake data records as defined in your schema.