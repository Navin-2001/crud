package com.example.crud.Repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.crud.Entity.Student;

public interface StudentRepo extends MongoRepository<Student, String> {

}
